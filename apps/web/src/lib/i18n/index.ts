import { Locale, locales, defaultLocale, localeNames, localeFlags } from './config';
import enTranslations from './translations/en.json';
import bmTranslations from './translations/bm.json';

type TranslationKey = keyof typeof enTranslations;
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKeys = NestedKeyOf<typeof enTranslations>;

const translations = {
  en: enTranslations,
  bm: bmTranslations,
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale] || translations[defaultLocale];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k as keyof typeof value];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export { locales, defaultLocale, localeNames, localeFlags, type Locale };

