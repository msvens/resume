'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

interface AdminNavProps {
  userName: string;
  userImage?: string;
}

export function AdminNav({ userName, userImage }: AdminNavProps) {
  return (
    <nav className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          Admin
        </Link>
        <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          View site
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {userImage && (
          <Image src={userImage} alt={userName} width={28} height={28} className="rounded-full" />
        )}
        <span className="text-sm text-neutral-600 dark:text-neutral-400">{userName}</span>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
