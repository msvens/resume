import 'server-only';
import { db } from '@/db/client';
import { profile } from '@/db/schema';

export async function getProfile() {
  const rows = await db.select().from(profile).limit(1);
  return rows[0] ?? null;
}
