interface MessageTemplates {
  en: {
    email_exists: string;
    verification_email_sent: string;
    verification_successful: string;
    invalid_code: string;
  };
  tr: {
    email_exists: string;
    verification_email_sent: string;
    verification_successful: string;
    invalid_code: string;
  };
}

export default function getMessage(lang: 'en' | 'tr', key: keyof MessageTemplates['en']): string {
  const messages: Record<'en' | 'tr', MessageTemplates['en']> = {
    en: {
      email_exists: 'You have already applied and been verified.',
      verification_email_sent: 'Verification email sent. Please check your inbox and spam.',
      verification_successful: 'Verification successful. Thank you!',
      invalid_code: 'Invalid verification code. Please try again.'
    },
    tr: {
      email_exists: 'Başvurunuz zaten yapılmış ve doğrulanmıştır.',
      verification_email_sent: 'Doğrulama e-postası gönderildi. Lütfen gelen kutunuza ve spam bölümüne bakın.',
      verification_successful: 'Doğrulama başarılı. Teşekkürler!',
      invalid_code: 'Geçersiz doğrulama kodu. Lütfen tekrar deneyin.'
    }
  };
  return messages[lang][key];
}
