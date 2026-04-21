'use client';

import Link from 'next/link';

export function Footer() {
  const now = new Date();
  const updated = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <footer className="no-print border-t border-neutral-200 dark:border-neutral-800 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">Martin Svensson</span>
          <span>·</span>
          <a href="https://github.com/msvens" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100">
            GitHub
          </a>
          <span>·</span>
          <Link href="/admin" className="hover:text-neutral-900 dark:hover:text-neutral-100">
            Admin
          </Link>
        </div>
        <div>
          Updated {updated}
        </div>
      </div>
    </footer>
  );
}
