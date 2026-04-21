import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ResumeHeaderProps {
  name: string;
  title: string;
  email: string;
  phone?: string | null;
  location: string;
  github?: string | null;
  linkedin?: string | null;
  photoUrl?: string | null;
  available?: boolean;
  bio: string;
}

export function ResumeHeader({
  name,
  title,
  email,
  phone,
  location,
  photoUrl,
  available,
  bio,
}: ResumeHeaderProps) {
  return (
    <header className="mb-12">
      <div className="flex items-center gap-5">
        {photoUrl && (
          <Image
            src={photoUrl}
            alt={name}
            width={72}
            height={72}
            className="rounded-full object-cover shrink-0"
          />
        )}
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {name}<span className="text-neutral-400 dark:text-neutral-500 font-normal">, {title}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-200">
              <EnvelopeIcon className="w-3.5 h-3.5" />
              {email}
            </a>
            <span className="flex items-center gap-1">
              <MapPinIcon className="w-3.5 h-3.5" />
              {location}
            </span>
            {phone && (
              <span className="flex items-center gap-1">
                <PhoneIcon className="w-3.5 h-3.5" />
                {phone}
              </span>
            )}
            {available && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="text-xs">Available</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-3xl">
        {bio.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </header>
  );
}
