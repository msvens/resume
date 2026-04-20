'use client';

import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n/translations';

export function useTranslations() {
  const { language } = useLanguage();
  return getTranslations(language);
}
