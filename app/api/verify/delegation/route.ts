import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import getMessage from '@/lib/getMessage';

interface DelegateFormData {
  fullName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  nationalId: string;
  gender: string;
  grade: string;
  city: string;
  accomodation: string;
  motivationLetter: string;
  experience: string;
  committeePreferences: string[];
  additionalInfo: string;
  englishLevel: string;
  dietaryPreferences: string;
}

interface RequestData {
  school: string;
  email: string;
  code: string;
  numberOfDelegates: number;
  delegates: DelegateFormData[];
  lang?: 'en' | 'tr';
}

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { school, email, numberOfDelegates, delegates, code, lang = 'en' } = data as RequestData;

    // Verify code for delegation application
    const { data: codeData, error } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('application_type', 'delegation')
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !codeData) {
      return NextResponse.json(
        { message: getMessage(lang, 'invalid_code') },
        { status: 400 }
      );
    }

    // Append to delegation sheet
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Get current row count
    const sheetInfo = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID_DELEGATION!,
      range: 'A2:Z'
    });
    
    const values = sheetInfo.data.values || [];
    const rowCount = values.length;
    let nextId = rowCount + 1;

    // Append delegation row
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID_DELEGATION!,
      range: 'Sayfa1!A:D',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[school, numberOfDelegates, email]]
      }
    });

    // Append each delegate
    for (const delegate of delegates) {
      nextId++;
      
      const delegateData = [
        delegate.fullName,
        delegate.birthDate,
        delegate.nationalId,
        delegate.gender,
        delegate.committeePreferences[0],
        delegate.committeePreferences[1],
        delegate.committeePreferences[2],
        delegate.englishLevel,
        delegate.dietaryPreferences,
        delegate.email,
        delegate.phoneNumber,
        delegate.city,
        delegate.grade,
        delegate.experience,
        delegate.motivationLetter,
        delegate.additionalInfo,
        delegate.accomodation
      ];
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID_DELEGATION!,
        range: 'Sayfa1!A:R',
        valueInputOption: 'RAW',
        requestBody: {
          values: [delegateData]
        }
      });
    }

    // Delete used code
    await supabase.from('verification_codes').delete().eq('email', email);

    return NextResponse.json(
      { message: getMessage(lang, 'verification_successful') },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delegation Verification Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}