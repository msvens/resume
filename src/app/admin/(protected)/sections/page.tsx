import { listSections } from '@/lib/services/sections';
import { SectionsList } from './SectionsList';

export default async function SectionsPage() {
  const sections = await listSections();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">Sections</h1>
      <SectionsList sections={sections} />
    </div>
  );
}
