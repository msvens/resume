export const translations = {
  en: {
    topBar: {
      downloadPdf: 'PDF',
      sourceCode: 'Source',
      available: 'Available',
    },
    resume: {
      present: 'Present',
    },
  },
  sv: {
    topBar: {
      downloadPdf: 'PDF',
      sourceCode: 'Källa',
      available: 'Tillgänglig',
    },
    resume: {
      present: 'Nuvarande',
    },
  },
} satisfies Record<string, TranslationStrings>;

interface TranslationStrings {
  topBar: {
    downloadPdf: string;
    sourceCode: string;
    available: string;
  };
  resume: {
    present: string;
  };
}

export type Translations = TranslationStrings;

export function getTranslations(lang: 'en' | 'sv'): Translations {
  return translations[lang];
}
