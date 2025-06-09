import getMessage from '@/lib/getMessage';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface RequestData {
  email: string;
  name: string;
  lang?: 'en' | 'tr';
}

interface SheetRow {
  [index: number]: string | undefined;
}

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!);

// Google Sheets setup
const SERVICE_ACCOUNT_KEY = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!);
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID_PRESS!;

export async function POST(request: Request) {
  try {
    const data: RequestData = await request.json();
    const { email, name, lang = 'en' } = data;

    // Check if email exists in Google Sheet
    const sheetResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A2:K1000?key=${SERVICE_ACCOUNT_KEY.private_key}`
    );
    
    const sheetData = await sheetResponse.json();
    const values: SheetRow[] = sheetData.values || [];

    if (values.some((row: SheetRow) => row[1] === email)) {
      return NextResponse.json(
        { message: getMessage(lang, 'email_exists') },
        { status: 400 }
      );
    }

    // Generate verification code
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

    // Store in Supabase
    const { error } = await supabase
      .from('verification_codes')
      .upsert({
        email,
        code,
        expires_at: expiresAt.toISOString(),
        application_type: 'press'
      });

    if (error) throw error;

    // Send verification email
    await sendVerificationEmail(email, name, code, lang);

    return NextResponse.json(
      { message: getMessage(lang, 'verification_email_sent') },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

function generateVerificationCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function sendVerificationEmail(email: string, name: string, code: string, lang: 'en' | 'tr') {
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL!;
    const emailSubject = lang === 'en' 
      ? 'Verify Your DADYAMUN Press Application' 
      : 'DADYAMUN Basın Başvurusu Doğrulama';

    const { data, error } = await resend.emails.send({
      from: `DADYAMUN Team <${fromEmail}>`,
      to: email,
      subject: emailSubject,
      html: generateEmailHtml(name, code, lang),
      text: generateEmailText(name, code, lang),
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send verification email');
    }

    console.log('Email sent:', data);
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

function generateEmailHtml(name: string, code: string, lang: 'en' | 'tr'): string {
  return lang === 'en' 
    ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #172D7F;">DADYAMUN'25 Press Application</h1>
        <p>Dear ${name},</p>
        <p>Thank you for applying to DADYAMUN'25 as a Press Team Member!</p>
        <p>Your verification code is:</p>
        <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
          ${code}
        </div>
        <p>This code will expire in 15 minutes.</p>
        <p>Best regards,<br/>DADYAMUN Secretariat</p>
        <p style="font-size: 12px; color: #888; margin-top: 30px;">
          If you didn't request this, please ignore this email.
        </p>
      </div>
    `
    : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #172D7F;">DADYAMUN'25 Basın Başvurusu</h1>
        <p>Sayın ${name},</p>
        <p>DADYAMUN'25'e Basın Takım Üyesi olarak başvurduğunuz için teşekkür ederiz!</p>
        <p>Doğrulama kodunuz:</p>
        <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
          ${code}
        </div>
        <p>Bu kod 15 dakika içinde geçersiz olacaktır.</p>
        <p>Saygılarımızla,<br/>DADYAMUN Sekreteryası</p>
        <p style="font-size: 12px; color: #888; margin-top: 30px;">
          Eğer bu işlemi siz yapmadıysanız, bu e-postayı dikkate almayınız.
        </p>
      </div>
    `;
}

function generateEmailText(name: string, code: string, lang: 'en' | 'tr'): string {
  return lang === 'en'
    ? `
      DADYAMUN'25 Press Application\n\n
      Dear ${name},\n\n
      Thank you for applying to DADYAMUN'25 as a Press Team Member!\n\n
      Your verification code is: ${code}\n\n
      This code will expire in 15 minutes.\n\n
      Best regards,\n
      DADYAMUN Secretariat\n\n
      If you didn't request this, please ignore this email.
    `
    : `
      DADYAMUN'25 Basın Başvurusu\n\n
      Sayın ${name},\n\n
      DADYAMUN'25'e Basın Takım Üyesi olarak başvurduğunuz için teşekkür ederiz!\n\n
      Doğrulama kodunuz: ${code}\n\n
      Bu kod 15 dakika içinde geçersiz olacaktır.\n\n
      Saygılarımızla,\n
      DADYAMUN Sekreteryası\n\n
      Eğer bu işlemi siz yapmadıysanız, bu e-postayı dikkate almayınız.
    `;
}
