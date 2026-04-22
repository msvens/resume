'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from './auth-guard';
import { profileSchema } from '@/lib/validation/schemas';
import { db } from '@/db/client';
import { profile } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getProfile } from '@/lib/services/profile';

function emptyToNull(val: string | undefined): string | null {
  return val && val.trim() !== '' ? val.trim() : null;
}

export async function updateProfile(formData: FormData) {
  await requireAdmin();

  const raw = {
    name: formData.get('name') as string,
    titleEn: formData.get('titleEn') as string,
    titleSv: formData.get('titleSv') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    locationEn: formData.get('locationEn') as string,
    locationSv: formData.get('locationSv') as string,
    github: formData.get('github') as string,
    linkedin: formData.get('linkedin') as string,
    photoUrl: formData.get('photoUrl') as string,
    available: formData.get('available') === 'on',
    bioEn: formData.get('bioEn') as string,
    bioSv: formData.get('bioSv') as string,
  };

  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.format() };
  }

  const data = parsed.data;
  const existing = await getProfile();
  if (!existing) return { ok: false, errors: 'No profile found' };

  await db.update(profile).set({
    name: data.name,
    titleEn: data.titleEn,
    titleSv: data.titleSv,
    email: data.email,
    phone: emptyToNull(data.phone),
    locationEn: data.locationEn,
    locationSv: data.locationSv,
    github: emptyToNull(data.github),
    linkedin: emptyToNull(data.linkedin),
    photoUrl: emptyToNull(data.photoUrl),
    available: data.available,
    bioEn: data.bioEn,
    bioSv: data.bioSv,
    updatedAt: new Date(),
  }).where(eq(profile.id, existing.id));

  revalidatePath('/');
  revalidatePath('/admin/profile');
  return { ok: true };
}
