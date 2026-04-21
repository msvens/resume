interface ResumeSectionProps {
  label: string;
  children: React.ReactNode;
}

export function ResumeSection({ label, children }: ResumeSectionProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-x-8 gap-y-4 mb-10 md:mb-16">
      <div className="md:sticky md:top-16 self-start">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          {label}
        </h2>
      </div>
      <div>{children}</div>
    </section>
  );
}
