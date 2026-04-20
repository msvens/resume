import 'server-only';
import { db } from '@/db/client';
import { profile } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getProfile() {
  const rows = await db.select().from(profile).where(eq(profile.id, 1));
  return rows[0] ?? null;
}
