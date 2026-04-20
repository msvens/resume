interface SectionChipsProps {
  items: string[];
}

export function SectionChips({ items }: SectionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
