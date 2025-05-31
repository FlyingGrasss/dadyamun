import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import getMessage from '@/lib/getMessage';

interface FormData {
  fullName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  nationalId: string;
  gender: string;
  school: string;
  accomodation: string;
  grade: string;
  city: string;
  motivationLetter: string;
  experience: string;
  committeePreferences: string[];
  additionalInfo: string;
  englishLevel: string;
  dietaryPreferences: string;
  lang?: 'en' | 'tr';
}

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, code, lang = 'en', ...formData } = data as { email: string; code: string; lang: 'en' | 'tr' } & FormData;

    // Verify code for delegate application
    const { data: codeData, error } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('application_type', 'delegate')
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !codeData) {
      return NextResponse.json(
        { message: getMessage(lang, 'invalid_code') },
        { status: 400 }
      );
    }

    // Append to delegate sheet
    const sheets = google.sheets({ version: 'v4', auth });
    const values = [
      [
        // -- Core Identification & Contact --
        formData.fullName,                 // 1. Full Name (Primary identifier)
        email,                             // 2. Email (Key contact info, usually unique)
        formData.phoneNumber,              // 3. Phone Number (Another key contact)
        formData.nationalId,               // 4. National ID (Moved up as per your preference)

        // -- Applicant Demographics & Basic Info --
        formData.birthDate,                // 5. Birth Date
        formData.gender,                   // 6. Gender
        formData.school,                   // 7. School
        formData.city,                     // 8. City
        formData.grade,                    // 9. Grade
        formData.accomodation,             // 10. Accommodation (Important for logistics)

        // -- Application Specifics & Qualifications --
        formData.englishLevel,             // 10. English Level (Very important for MUN)
        formData.committeePreferences[0],  // 11. Committee Preference 1
        formData.committeePreferences[1],  // 12. Committee Preference 2
        formData.committeePreferences[2],  // 13. Committee Preference 3
        formData.experience,               // 14. Experience (Highly relevant for selection)
        formData.motivationLetter,         // 15. Motivation Letter (Critical for review, can be longer)

        // -- Other / Miscellaneous --
        formData.dietaryPreferences,       // 16. Dietary Preferences (Important for logistics, less for initial review)
        formData.additionalInfo            // 17. Additional Info (Miscellaneous, can be long)
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID_DELEGATE!,
      range: 'Sayfa1!A:R', // Updated to match all columns
      valueInputOption: 'RAW',
      requestBody: { values }
    });

    // Delete used code
    await supabase.from('verification_codes').delete().eq('email', email);

    return NextResponse.json(
      { message: getMessage(lang, 'verification_successful') },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delegate Verification Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}