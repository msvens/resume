'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ label = 'Save' }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {pending ? 'Saving...' : label}
    </button>
  );
}
