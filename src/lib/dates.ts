import { getTranslations } from '@/lib/i18n/translations';

export function formatDateRange(startDate?: string | null, endDate?: string | null, locale: 'en' | 'sv' = 'en'): string | null {
  if (!startDate && !endDate) return null;

  const t = getTranslations(locale);
  const formatYear = (iso: string) => new Date(iso).getFullYear().toString();

  if (startDate && endDate) {
    return `${formatYear(startDate)} — ${formatYear(endDate)}`;
  }
  if (startDate) {
    return `${formatYear(startDate)} — ${t.resume.present}`;
  }
  return formatYear(endDate!);
}

export function formatDate(iso: string, style: 'year' | 'month-year' | 'full' = 'year', locale: 'en' | 'sv' = 'en'): string {
  const jsLocale = locale === 'sv' ? 'sv-SE' : 'en-US';
  const d = new Date(iso);
  switch (style) {
    case 'year':
      return d.getFullYear().toString();
    case 'month-year':
      return d.toLocaleDateString(jsLocale, { month: 'long', year: 'numeric' });
    case 'full':
      return d.toLocaleDateString(jsLocale, { month: 'long', day: 'numeric', year: 'numeric' });
  }
}
