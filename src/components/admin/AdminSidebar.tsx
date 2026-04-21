'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const navItems = [
  { href: '/admin/profile', label: 'Profile' },
  { href: '/admin/sections', label: 'Sections' },
];

function NavLink({ href, label, active, onClick, sidebar = false }: { href: string; label: string; active: boolean; onClick?: () => void; sidebar?: boolean }) {
  const base = sidebar
    ? `block px-3 py-2 text-sm rounded transition-colors`
    : `block px-4 py-2 text-sm transition-colors`;

  const state = active
    ? 'font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800'
    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50';

  return (
    <Link href={href} onClick={onClick} className={`${base} ${state}`}>
      {label}
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const currentLabel = navItems.find((item) => isActive(item.href))?.label ?? 'Admin';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-48 shrink-0 border-r border-neutral-200 dark:border-neutral-800 py-6 pr-6">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} active={isActive(item.href)} sidebar />
          ))}
        </nav>
        <div className="pt-3 mt-3 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="block w-full text-left px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile dropdown */}
      <div className="md:hidden mx-4 my-3" ref={dropdownRef}>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm bg-white dark:bg-neutral-900 overflow-hidden">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center justify-between px-4 py-3 w-full"
          >
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{currentLabel}</span>
            <ChevronDownIcon className={`w-4 h-4 text-neutral-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {menuOpen && (
            <div className="py-1">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} active={isActive(item.href)} onClick={() => setMenuOpen(false)} />
              ))}
              <div className="mt-1 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
