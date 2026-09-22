interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ index, eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        {index && <span className="text-xs tabular-nums text-muted">{index}</span>}
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
      </div>
      <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
