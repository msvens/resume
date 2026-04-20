'use client';

import { useState } from 'react';

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
}

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex gap-2 text-sm">
        <button
          onClick={async () => {
            setDeleting(true);
            await onDelete();
          }}
          disabled={deleting}
          className="text-red-600 hover:text-red-800 disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Confirm'}
        </button>
        <button onClick={() => setConfirming(false)} className="text-neutral-500 hover:text-neutral-700">
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} className="text-sm text-red-500 hover:text-red-700">
      Delete
    </button>
  );
}
