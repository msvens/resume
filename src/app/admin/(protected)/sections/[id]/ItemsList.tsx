'use client';

import { useState } from 'react';
import { createSectionItem, updateSectionItem, deleteSectionItem, reorderSectionItem } from '@/lib/actions/sections';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { ReorderButtons } from '@/components/admin/ReorderButtons';
import { ItemForm } from './ItemForm';
import type { SectionItemData } from '@/lib/types';

interface ItemsListProps {
  sectionId: number;
  displayType: string;
  items: SectionItemData[];
}

export function ItemsList({ sectionId, displayType, items }: ItemsListProps) {
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const isChips = displayType === 'chips';

  const nextSortOrder = items.length > 0
    ? Math.max(...items.map((i) => i.sortOrder)) + 10
    : 10;

  async function handleCreate(formData: FormData) {
    formData.set('sectionId', String(sectionId));
    formData.set('sortOrder', String(nextSortOrder));
    const result = await createSectionItem(formData);
    if (result.ok) {
      setShowNewForm(false);
      setMessage('Item created');
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage('Validation failed');
    }
  }

  async function handleUpdate(id: number, formData: FormData) {
    formData.set('sectionId', String(sectionId));
    const result = await updateSectionItem(id, formData);
    if (result.ok) {
      setEditingId(null);
      setMessage('Item updated');
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage('Validation failed');
    }
  }

  async function handleDelete(id: number) {
    await deleteSectionItem(id);
  }

  async function handleReorder(id: number, direction: 'up' | 'down') {
    await reorderSectionItem(id, sectionId, direction);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Items ({items.length})</h2>

      {message && (
        <p className={`text-sm ${message.includes('fail') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>
      )}

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={item.id}>
            {editingId === item.id ? (
              <ItemForm
                isChips={isChips}
                defaultValues={item}
                onSubmit={(fd) => handleUpdate(item.id, fd)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-800 rounded">
                <ReorderButtons
                  onMove={(dir) => handleReorder(item.id, dir)}
                  isFirst={idx === 0}
                  isLast={idx === items.length - 1}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{item.titleEn}</span>
                  {item.subtitleEn && <span className="ml-2 text-xs text-neutral-500">{item.subtitleEn}</span>}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => setEditingId(item.id)} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
                    Edit
                  </button>
                  <DeleteButton onDelete={() => handleDelete(item.id)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showNewForm ? (
        <ItemForm isChips={isChips} onSubmit={handleCreate} onCancel={() => setShowNewForm(false)} />
      ) : (
        <button
          onClick={() => setShowNewForm(true)}
          className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          + New Item
        </button>
      )}
    </div>
  );
}
