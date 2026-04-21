'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage, type Language } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import Link from 'next/link';
import { SunIcon, MoonIcon, ArrowDownTrayIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const socialLinks = [
  { href: 'https://github.com/msvens', label: 'GitHub' },
  { href: 'https://linkedin.com/in/msvens', label: 'LinkedIn' },
];

function LanguageToggle({ language, setLanguage, className = '' }: { language: Language; setLanguage: (l: Language) => void; className?: string }) {
  const nextLang = language === 'en' ? 'sv' : 'en';
  const flag = nextLang === 'sv' ? '🇸🇪' : '🇬🇧';

  return (
    <button
      onClick={() => setLanguage(nextLang)}
      className={`p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors ${className}`}
      aria-label={`Switch to ${nextLang === 'sv' ? 'Svenska' : 'English'}`}
    >
      <span className="text-base">{flag}</span>
    </button>
  );
}

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <header className="no-print sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-4xl mx-auto px-6 py-3">
        {/* Desktop: 8-column grid — 2 left, 4 center, 2 right */}
        <div className="hidden md:grid grid-cols-8 items-center">
          <div className="col-span-2 flex items-center">
            <Link href="/" className="font-mono text-sm font-bold text-neutral-900 dark:text-neutral-100 hover:opacity-70 transition-opacity">
              MS
            </Link>
          </div>

          <div className="col-span-4 flex items-center justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="col-span-2 flex items-center justify-end gap-2">
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <button
              onClick={toggleTheme}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </button>
            <a
              href={`/api/pdf?lang=${language}`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ArrowDownTrayIcon className="w-3.5 h-3.5" />
              {t.topBar.downloadPdf}
            </a>
          </div>
        </div>

        {/* Mobile: logo + center links + hamburger */}
        <div className="flex md:hidden items-center justify-between">
          <Link href="/" className="font-mono text-sm font-bold text-neutral-900 dark:text-neutral-100">
            MS
          </Link>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 dark:text-neutral-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 text-neutral-600 dark:text-neutral-400"
            aria-label="Menu"
          >
            {menuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
          </button>
        </div>
      </div>

    </header>

      {/* Mobile overlay + drawer — outside header to escape backdrop-blur stacking context */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-[49px] right-0 h-[calc(100vh-49px)] w-56 bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-lg z-[70] transition-all duration-200 ease-in-out ${
          menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <div className="py-4 px-4 space-y-4">
          <button
            onClick={() => { setLanguage(language === 'en' ? 'sv' : 'en'); setMenuOpen(false); }}
            className="w-full flex items-center gap-3 py-2 text-sm text-neutral-600 dark:text-neutral-400"
          >
            <span className="text-base">{language === 'en' ? '🇸🇪' : '🇬🇧'}</span>
            {language === 'en' ? 'Svenska' : 'English'}
          </button>
          <button
            onClick={() => { toggleTheme(); setMenuOpen(false); }}
            className="w-full flex items-center gap-3 py-2 text-sm text-neutral-600 dark:text-neutral-400"
          >
            {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <a
              href={`/api/pdf?lang=${language}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 py-2"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              {t.topBar.downloadPdf}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
