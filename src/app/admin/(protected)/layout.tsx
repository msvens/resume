import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/signin');
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <AdminNav userName={session.user.name ?? 'Admin'} userImage={session.user.image ?? undefined} />
      {children}
    </div>
  );
}
