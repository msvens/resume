import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

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
    <div className="max-w-5xl mx-auto px-6">
      {/* Mobile: stacked layout */}
      <div className="md:hidden">
        <AdminSidebar />
        <div className="py-6">{children}</div>
      </div>

      {/* Desktop: sidebar + content */}
      <div className="hidden md:flex gap-8 py-8">
        <AdminSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
