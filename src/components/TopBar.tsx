'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLanguage, type Language } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { SunIcon, MoonIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = useTranslations();

  const languages: Language[] = ['en', 'sv'];

  return (
    <header className="no-print sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-end gap-2">
        {/* Language toggle */}
        <div className="flex items-center gap-1 mr-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 py-1 text-xs font-mono uppercase rounded transition-colors ${
                language === lang
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        </button>

        {/* PDF download */}
        <a
          href={`/api/pdf?lang=${language}`}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ArrowDownTrayIcon className="w-3.5 h-3.5" />
          {t.topBar.downloadPdf}
        </a>

      </div>
    </header>
  );
}
