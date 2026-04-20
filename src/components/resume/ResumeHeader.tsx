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
  github,
  linkedin,
  photoUrl,
  available,
  bio,
}: ResumeHeaderProps) {
  return (
    <header>
      {/* Top bar: photo + title + contact */}
      <div className="flex items-center gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        {photoUrl && (
          <Image
            src={photoUrl}
            alt={name}
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            {title}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-200">
              <EnvelopeIcon className="w-3.5 h-3.5" />
              {email}
            </a>
            {phone && (
              <span className="flex items-center gap-1">
                <PhoneIcon className="w-3.5 h-3.5" />
                {phone}
              </span>
            )}
            {github && (
              <a href={`https://github.com/${github}`} className="hover:text-neutral-900 dark:hover:text-neutral-200">
                GitHub
              </a>
            )}
            {linkedin && (
              <a href={linkedin} className="hover:text-neutral-900 dark:hover:text-neutral-200">
                LinkedIn
              </a>
            )}
            <span className="flex items-center gap-1">
              <MapPinIcon className="w-3.5 h-3.5" />
              {location}
            </span>
            {available && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="text-xs">Available</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Large name */}
      <h1 className="mt-10 mb-4 text-6xl md:text-8xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 leading-[0.95]">
        {name}
      </h1>

      {/* Bio */}
      <div className="mt-6 mb-12 space-y-4 text-neutral-600 dark:text-neutral-400 text-base leading-relaxed max-w-3xl">
        {bio.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </header>
  );
}
