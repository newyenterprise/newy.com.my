export const locales = ['en', 'bm'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  bm: 'Bahasa Malaysia',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  bm: '🇲🇾',
};

