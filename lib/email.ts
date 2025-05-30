type AppType = 'delegate' | 'press' | 'admin' | 'delegation' | 'pr';

export const getEmailTemplate = (
  name: string, 
  code: string, 
  lang: 'en' | 'tr', 
  appType: AppType
) => {
  const templates: Record<AppType, { en: string; tr: string }> = {
    delegate: {
      en: `Dear ${name},\n\nYour delegate application verification code is: ${code}`,
      tr: `Sayın ${name},\n\nDelege başvuru doğrulama kodunuz: ${code}`
    },
    press: {
      en: `Dear ${name},\n\nYour press application verification code is: ${code}`,
      tr: `Sayın ${name},\n\nBasın başvuru doğrulama kodunuz: ${code}`
    },
    admin: {
      en: `Dear ${name},\n\nYour admin application verification code is: ${code}`,
      tr: `Sayın ${name},\n\nYönetici başvuru doğrulama kodunuz: ${code}`
    },
    delegation: {
      en: `Dear ${name},\n\nYour delegation application verification code is: ${code}`,
      tr: `Sayın ${name},\n\nDelegasyon başvuru doğrulama kodunuz: ${code}`
    },
    pr: {
      en: `Dear ${name},\n\nYour PR application verification code is: ${code}`,
      tr: `Sayın ${name},\n\nPR başvuru doğrulama kodunuz: ${code}`
    }
  };
  return templates[appType][lang];
};