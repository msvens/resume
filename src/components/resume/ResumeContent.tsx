'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ResumeHeader } from '@/components/resume/ResumeHeader';
import { ResumeSection } from '@/components/resume/ResumeSection';
import { SectionEntry } from '@/components/resume/SectionEntry';
import { SectionChips } from '@/components/resume/SectionChips';
import type { ProfileData, SectionWithItems } from '@/lib/types';

interface ResumeContentProps {
  profile: ProfileData;
  sections: SectionWithItems[];
}

export function ResumeContent({ profile, sections }: ResumeContentProps) {
  const { language } = useLanguage();
  const l = language;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <ResumeHeader
        name={profile.name}
        title={l === 'sv' ? profile.titleSv : profile.titleEn}
        email={profile.email}
        phone={profile.phone}
        location={l === 'sv' ? profile.locationSv : profile.locationEn}
        github={profile.github}
        linkedin={profile.linkedin}
        photoUrl={profile.photoUrl}
        available={profile.available}
        bio={l === 'sv' ? profile.bioSv : profile.bioEn}
      />

      {sections.map((s) => (
        <ResumeSection key={s.id} label={l === 'sv' ? s.labelSv : s.labelEn}>
          {s.displayType === 'chips' ? (
            <SectionChips items={s.items.map((item) => l === 'sv' ? item.titleSv : item.titleEn)} />
          ) : (
            s.items.map((item) => (
              <SectionEntry
                key={item.id}
                title={l === 'sv' ? item.titleSv : item.titleEn}
                subtitle={l === 'sv' ? item.subtitleSv : item.subtitleEn}
                startDate={item.startDate}
                endDate={item.endDate}
                locale={l}
                link={item.link}
                description={l === 'sv' ? item.descriptionSv : item.descriptionEn}
              />
            ))
          )}
        </ResumeSection>
      ))}
    </main>
  );
}
