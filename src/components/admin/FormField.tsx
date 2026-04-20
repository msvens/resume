'use client';

interface FormFieldProps {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export function FormField({
  label,
  name,
  defaultValue = '',
  type = 'text',
  placeholder,
  required = false,
}: FormFieldProps) {
  return (
    <div>
      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 block mb-1">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm"
      />
    </div>
  );
}
