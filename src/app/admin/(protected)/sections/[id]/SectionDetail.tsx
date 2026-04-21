'use client';

import { useState } from 'react';
import Link from 'next/link';
import { updateSection } from '@/lib/actions/sections';
import { BilingualField } from '@/components/admin/BilingualField';
import { FormField } from '@/components/admin/FormField';
import { SubmitButton } from '@/components/admin/SubmitButton';
import { ItemsList } from './ItemsList';
import type { SectionData, SectionItemData } from '@/lib/types';

export function SectionDetail({ section, items }: { section: SectionData; items: SectionItemData[] }) {
  const [editingSection, setEditingSection] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleUpdateSection(formData: FormData) {
    const result = await updateSection(section.id, formData);
    if (result.ok) {
      setEditingSection(false);
      setMessage('Section updated');
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage('Validation failed');
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/sections" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          &larr; Sections
        </Link>
      </div>

      {message && (
        <p className={`text-sm ${message.includes('fail') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>
      )}

      {/* Section header / edit */}
      {editingSection ? (
        <form action={handleUpdateSection} className="space-y-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded">
          <h2 className="font-medium text-neutral-900 dark:text-neutral-100">Edit Section</h2>
          <FormField label="Slug" name="slug" defaultValue={section.slug} required />
          <BilingualField label="Label" nameEn="labelEn" nameSv="labelSv" defaultValueEn={section.labelEn} defaultValueSv={section.labelSv} />
          <div>
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 block mb-1">Display Type</label>
            <select
              name="displayType"
              defaultValue={section.displayType}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm"
            >
              <option value="entries">Entries</option>
              <option value="chips">Chips</option>
            </select>
          </div>
          <FormField label="Sort Order" name="sortOrder" type="number" defaultValue={String(section.sortOrder)} required />
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <input type="checkbox" name="visible" defaultChecked={section.visible} className="rounded" />
              Visible on website
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <input type="checkbox" name="showInPdf" defaultChecked={section.showInPdf} className="rounded" />
              Include in PDF
            </label>
          </div>
          <div className="flex gap-2">
            <SubmitButton />
            <button type="button" onClick={() => setEditingSection(false)} className="px-4 py-2 text-sm text-neutral-500">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">{section.labelEn}</h1>
            <p className="text-sm text-neutral-500 mt-1">{section.slug} · {section.displayType}{!section.visible && ' · hidden'}{!section.showInPdf && ' · no PDF'}</p>
          </div>
          <button onClick={() => setEditingSection(true)} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
            Edit section
          </button>
        </div>
      )}

      {/* Items */}
      <ItemsList sectionId={section.id} displayType={section.displayType} items={items} />
    </div>
  );
}
