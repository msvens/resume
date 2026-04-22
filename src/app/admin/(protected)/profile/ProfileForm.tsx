'use client';

import { useState } from 'react';
import { updateProfile } from '@/lib/actions/profile';
import { BilingualField } from '@/components/admin/BilingualField';
import { FormField } from '@/components/admin/FormField';
import { SubmitButton } from '@/components/admin/SubmitButton';
import type { ProfileData } from '@/lib/types';

export function ProfileForm({ profile }: { profile: ProfileData }) {
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await updateProfile(formData);
    if (result.ok) {
      setMessage('Profile updated');
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage('Validation failed');
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-3xl">
      {message && (
        <p className={`text-sm ${message.includes('fail') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>
      )}

      <FormField label="Name" name="name" defaultValue={profile.name} required />
      <BilingualField label="Title" nameEn="titleEn" nameSv="titleSv" defaultValueEn={profile.titleEn} defaultValueSv={profile.titleSv} />
      <FormField label="Email" name="email" type="email" defaultValue={profile.email} required />
      <FormField label="Phone" name="phone" defaultValue={profile.phone ?? ''} />
      <BilingualField label="Location" nameEn="locationEn" nameSv="locationSv" defaultValueEn={profile.locationEn} defaultValueSv={profile.locationSv} />
      <FormField label="GitHub username" name="github" defaultValue={profile.github ?? ''} />
      <FormField label="LinkedIn URL" name="linkedin" defaultValue={profile.linkedin ?? ''} />
      <FormField label="Photo URL" name="photoUrl" defaultValue={profile.photoUrl ?? ''} />

      <div>
        <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
          <input type="checkbox" name="available" defaultChecked={profile.available} className="rounded" />
          Available for opportunities
        </label>
      </div>

      <BilingualField label="Bio (Markdown)" nameEn="bioEn" nameSv="bioSv" defaultValueEn={profile.bioEn} defaultValueSv={profile.bioSv} markdown rows={8} />

      <SubmitButton />
    </form>
  );
}
