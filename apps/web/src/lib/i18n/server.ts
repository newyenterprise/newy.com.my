import { headers } from 'next/headers';
import { getTranslations, getTranslation, isValidLocale, defaultLocale, type Locale } from './index';

export async function getServerTranslations(locale?: string) {
  const validLocale = locale && isValidLocale(locale) ? locale : defaultLocale;
  const translations = getTranslations(validLocale);
  
  const t = (key: string): string => {
    return getTranslation(validLocale, key);
  };
  
  return {
    t,
    translations,
    locale: validLocale,
  };
}

export function getServerLocale(): Locale {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  
  // If pathname starts with /bm, it's Bahasa Malaysia
  if (pathname.startsWith('/bm')) {
    return 'bm';
  }
  
  // Otherwise, it's English (default, no prefix)
  return defaultLocale;
}

