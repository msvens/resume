'use client';

import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface ReorderButtonsProps {
  onMove: (direction: 'up' | 'down') => Promise<void>;
  isFirst: boolean;
  isLast: boolean;
}

export function ReorderButtons({ onMove, isFirst, isLast }: ReorderButtonsProps) {
  const [moving, setMoving] = useState(false);

  async function handleMove(direction: 'up' | 'down') {
    setMoving(true);
    await onMove(direction);
    setMoving(false);
  }

  return (
    <div className="flex flex-col gap-0.5">
      <button
        onClick={() => handleMove('up')}
        disabled={isFirst || moving}
        className="p-0.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:text-neutral-300 dark:disabled:text-neutral-600 disabled:cursor-default disabled:hover:text-neutral-300 dark:disabled:hover:text-neutral-600 transition-colors"
        aria-label="Move up"
      >
        <ChevronUpIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleMove('down')}
        disabled={isLast || moving}
        className="p-0.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:text-neutral-300 dark:disabled:text-neutral-600 disabled:cursor-default disabled:hover:text-neutral-300 dark:disabled:hover:text-neutral-600 transition-colors"
        aria-label="Move down"
      >
        <ChevronDownIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
