import { getProfile } from '@/lib/services/profile';
import { listVisibleSectionsWithItems } from '@/lib/services/sections';
import { ResumeContent } from '@/components/resume/ResumeContent';

export default async function Home() {
  const [profileData, sections] = await Promise.all([
    getProfile(),
    listVisibleSectionsWithItems(),
  ]);

  if (!profileData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">No profile data found. Run pnpm db:seed to populate.</p>
      </main>
    );
  }

  return <ResumeContent profile={profileData} sections={sections} />;
}
