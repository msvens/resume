import { getProfile } from '@/lib/services/profile';
import { ProfileForm } from './ProfileForm';

export default async function ProfilePage() {
  const profileData = await getProfile();

  if (!profileData) {
    return <p className="text-neutral-500">No profile found. Run pnpm db:seed first.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">Profile</h1>
      <ProfileForm profile={profileData} />
    </div>
  );
}
