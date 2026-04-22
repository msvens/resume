'use client';

import { MarkdownEditor } from './MarkdownEditor';

interface BilingualFieldProps {
  label: string;
  nameEn: string;
  nameSv: string;
  defaultValueEn?: string;
  defaultValueSv?: string;
  textarea?: boolean;
  markdown?: boolean;
  rows?: number;
}

export function BilingualField({
  label,
  nameEn,
  nameSv,
  defaultValueEn = '',
  defaultValueSv = '',
  textarea = false,
  markdown = false,
  rows = 4,
}: BilingualFieldProps) {
  const inputClass = "w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm";

  function renderField(name: string, defaultValue: string, fieldLabel: string) {
    if (markdown) {
      return <MarkdownEditor name={name} defaultValue={defaultValue} rows={rows} label={fieldLabel} />;
    }
    if (textarea) {
      return (
        <div>
          <label className="text-xs text-neutral-500 mb-1 block">{fieldLabel}</label>
          <textarea name={name} defaultValue={defaultValue} rows={rows} className={inputClass} />
        </div>
      );
    }
    return (
      <div>
        <label className="text-xs text-neutral-500 mb-1 block">{fieldLabel}</label>
        <input type="text" name={name} defaultValue={defaultValue} className={inputClass} />
      </div>
    );
  }

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</legend>
      <div className={`grid grid-cols-1 gap-3 ${!textarea && !markdown ? 'md:grid-cols-2' : ''}`}>
        {renderField(nameEn, defaultValueEn, 'EN')}
        {renderField(nameSv, defaultValueSv, 'SV')}
      </div>
    </fieldset>
  );
}
