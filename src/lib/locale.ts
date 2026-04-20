import type { Language } from '@/context/LanguageContext';

export function getServerLocale(cookieHeader?: string): Language {
  if (!cookieHeader) return 'en';
  const match = cookieHeader.match(/(?:^|;\s*)lang=(en|sv)/);
  return (match?.[1] as Language) ?? 'en';
}
