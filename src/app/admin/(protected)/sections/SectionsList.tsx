'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createSection, deleteSection, reorderSections } from '@/lib/actions/sections';
import { BilingualField } from '@/components/admin/BilingualField';
import { FormField } from '@/components/admin/FormField';
import { SubmitButton } from '@/components/admin/SubmitButton';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { ReorderButtons } from '@/components/admin/ReorderButtons';
import type { SectionData } from '@/lib/types';

export function SectionsList({ sections }: { sections: SectionData[] }) {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const nextSortOrder = sections.length > 0
    ? Math.max(...sections.map((s) => s.sortOrder)) + 10
    : 10;

  async function handleCreate(formData: FormData) {
    formData.set('sortOrder', String(nextSortOrder));
    const result = await createSection(formData);
    if (result.ok) {
      setShowForm(false);
      setMessage('Section created');
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage('Validation failed');
    }
  }

  async function handleDelete(id: number) {
    await deleteSection(id);
  }

  async function handleReorder(id: number, direction: 'up' | 'down') {
    await reorderSections(id, direction);
  }

  return (
    <div className="space-y-4">
      {message && (
        <p className={`text-sm ${message.includes('fail') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>
      )}

      <div className="space-y-2">
        {sections.map((s, idx) => (
          <div key={s.id} className="flex items-center gap-3 p-4 border border-neutral-200 dark:border-neutral-800 rounded">
            <ReorderButtons
              onMove={(dir) => handleReorder(s.id, dir)}
              isFirst={idx === 0}
              isLast={idx === sections.length - 1}
            />
            <div className="flex-1 min-w-0">
              <Link href={`/admin/sections/${s.id}`} className="font-medium text-neutral-900 dark:text-neutral-100 hover:underline">
                {s.labelEn}
              </Link>
              <span className="ml-2 text-xs text-neutral-500">{s.slug} · {s.displayType}</span>
            </div>
            <DeleteButton onDelete={() => handleDelete(s.id)} />
          </div>
        ))}
      </div>

      {showForm ? (
        <form action={handleCreate} className="space-y-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded">
          <h3 className="font-medium text-neutral-900 dark:text-neutral-100">New Section</h3>
          <FormField label="Slug" name="slug" placeholder="e.g. certifications" required />
          <BilingualField label="Label" nameEn="labelEn" nameSv="labelSv" />
          <div>
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 block mb-1">Display Type</label>
            <select
              name="displayType"
              defaultValue="entries"
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm"
            >
              <option value="entries">Entries (full items)</option>
              <option value="chips">Chips (tags/pills)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <input type="checkbox" name="visible" defaultChecked={true} className="rounded" />
              Visible on website
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <input type="checkbox" name="showInPdf" defaultChecked={true} className="rounded" />
              Include in PDF
            </label>
          </div>
          <div className="flex gap-2">
            <SubmitButton label="Create" />
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          + New Section
        </button>
      )}
    </div>
  );
}
