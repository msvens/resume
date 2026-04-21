import { Markdown } from '@/components/resume/Markdown';
import { formatDateRange } from '@/lib/dates';

interface SectionEntryProps {
  title: string;
  subtitle?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  locale?: 'en' | 'sv';
  link?: string | null;
  description?: string | null;
}

export function SectionEntry({ title, subtitle, startDate, endDate, locale = 'en', link, description }: SectionEntryProps) {
  const dateDisplay = formatDateRange(startDate, endDate, locale);

  const titleContent = link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
      {title}
    </a>
  ) : (
    title
  );

  return (
    <div className="pt-8 mt-8 border-t border-neutral-200 dark:border-neutral-800 first:border-0 first:mt-0 first:pt-0">
      <h3 className="text-base sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        {titleContent}
      </h3>
      {subtitle && (
        <p className="text-neutral-500 dark:text-neutral-400 italic mt-0.5">{subtitle}</p>
      )}
      {dateDisplay && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">{dateDisplay}</p>
      )}
      {description && (
        <div className="mt-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <Markdown content={description} />
        </div>
      )}
    </div>
  );
}
