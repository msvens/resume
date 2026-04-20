'use client';

import { signIn } from 'next-auth/react';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">Admin</h1>
        <p className="text-neutral-500">Sign in to manage your resume content.</p>
        <button
          onClick={() => signIn('github', { callbackUrl: '/admin' })}
          className="px-6 py-2.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded font-medium hover:opacity-90 transition-opacity"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
