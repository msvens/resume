'use server';

import { auth } from '@/auth';

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.githubId || session.user.githubId !== process.env.ADMIN_GITHUB_ID) {
    throw new Error('Unauthorized');
  }
  return session;
}
