'use client';

import { usePathname } from 'next/navigation';
import { getTranslations, getTranslation, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n';

export function useTranslations() {
  const pathname = usePathname();
  // Detect locale from pathname: if it starts with /bm, it's BM, otherwise English
  const locale = pathname?.startsWith('/bm') ? 'bm' : 'en';
  const validLocale = isValidLocale(locale) ? locale : defaultLocale;
  
  const t = (key: string): string => {
    return getTranslation(validLocale, key);
  };
  
  const translations = getTranslations(validLocale);
  
  return {
    t,
    translations,
    locale: validLocale,
  };
}

export function useLocale(): Locale {
  const pathname = usePathname();
  // Detect locale from pathname: if it starts with /bm, it's BM, otherwise English
  const locale = pathname?.startsWith('/bm') ? 'bm' : 'en';
  return isValidLocale(locale) ? locale : defaultLocale;
}

