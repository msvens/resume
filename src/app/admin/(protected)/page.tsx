import Link from 'next/link';

const adminLinks = [
  { href: '/admin/profile', label: 'Profile', description: 'Name, title, bio, contact info' },
  { href: '/admin/sections', label: 'Sections', description: 'Manage resume sections and items' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{link.label}</h2>
            <p className="mt-1 text-sm text-neutral-500">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
