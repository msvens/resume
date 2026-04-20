'use client';

import { createContext, useContext, useState } from 'react';
import { safeGetItem, safeSetItem } from '@/lib/storage';

export type Language = 'en' | 'sv';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(fallback: Language): Language {
  if (typeof window === 'undefined') return fallback;
  const saved = safeGetItem('language');
  return (saved === 'en' || saved === 'sv') ? saved : fallback;
}

export function LanguageProvider({ initialLocale, children }: { initialLocale: Language; children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage(initialLocale));

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    safeSetItem('language', lang);
    document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
