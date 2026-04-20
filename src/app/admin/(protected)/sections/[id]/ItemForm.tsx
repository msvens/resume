'use client';

import { BilingualField } from '@/components/admin/BilingualField';
import { FormField } from '@/components/admin/FormField';
import { SubmitButton } from '@/components/admin/SubmitButton';
import type { SectionItemData } from '@/lib/types';

interface ItemFormProps {
  isChips: boolean;
  defaultValues?: Partial<SectionItemData>;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

export function ItemForm({ isChips, defaultValues = {}, onSubmit, onCancel }: ItemFormProps) {
  return (
    <form action={onSubmit} className="space-y-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded">
      <BilingualField label="Title" nameEn="titleEn" nameSv="titleSv" defaultValueEn={defaultValues.titleEn ?? ''} defaultValueSv={defaultValues.titleSv ?? ''} />

      {!isChips && (
        <>
          <BilingualField label="Subtitle" nameEn="subtitleEn" nameSv="subtitleSv" defaultValueEn={defaultValues.subtitleEn ?? ''} defaultValueSv={defaultValues.subtitleSv ?? ''} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField label="Start Date" name="startDate" type="date" defaultValue={defaultValues.startDate ?? ''} />
            <FormField label="End Date" name="endDate" type="date" defaultValue={defaultValues.endDate ?? ''} />
          </div>
          <FormField label="Link" name="link" defaultValue={defaultValues.link ?? ''} placeholder="https://..." />
          <BilingualField label="Description (Markdown)" nameEn="descriptionEn" nameSv="descriptionSv" defaultValueEn={defaultValues.descriptionEn ?? ''} defaultValueSv={defaultValues.descriptionSv ?? ''} markdown rows={6} />
        </>
      )}

      {defaultValues.sortOrder != null && (
        <input type="hidden" name="sortOrder" value={defaultValues.sortOrder} />
      )}

      <div className="flex gap-2">
        <SubmitButton label={defaultValues.id ? 'Update' : 'Create'} />
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700">
          Cancel
        </button>
      </div>
    </form>
  );
}
