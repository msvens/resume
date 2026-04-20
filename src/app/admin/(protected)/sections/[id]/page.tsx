import { notFound } from 'next/navigation';
import { getSection, listItemsBySection } from '@/lib/services/sections';
import { SectionDetail } from './SectionDetail';

export default async function SectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sectionId = Number(id);
  if (isNaN(sectionId)) notFound();

  const [sectionData, items] = await Promise.all([
    getSection(sectionId),
    listItemsBySection(sectionId),
  ]);

  if (!sectionData) notFound();

  return (
    <div className="space-y-6">
      <SectionDetail section={sectionData} items={items} />
    </div>
  );
}
