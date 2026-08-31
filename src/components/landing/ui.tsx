import type { ReactNode } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-body text-[11px] leading-[15px] font-medium text-stencil uppercase">
      {children}
    </p>
  );
}

export function Heading({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[32px] leading-[34px] font-black uppercase lg:text-[48px] lg:leading-[50px] ${className}`}
    >
      {children}
    </h2>
  );
}

const highlightTones = { light: '#ddd2f7', brand: '#7c3be6' };

export function Highlight({
  children,
  tone = 'light',
}: {
  children: ReactNode;
  tone?: keyof typeof highlightTones;
}) {
  return (
    <span
      className="[box-decoration-break:clone] bg-no-repeat [-webkit-box-decoration-break:clone]"
      style={{
        backgroundImage: `linear-gradient(180deg, transparent 58%, ${highlightTones[tone]} 58%)`,
      }}
    >
      {children}
    </span>
  );
}

export function CompareColumn({
  variant,
  tone,
  label,
  items,
  className = '',
}: {
  variant: 'before' | 'after';
  tone: 'dark' | 'light';
  label: string;
  items: string[];
  className?: string;
}) {
  const isAfter = variant === 'after';
  const isFilled = isAfter && tone === 'light';
  const mutedTextClass = tone === 'dark' ? 'text-cream-muted' : 'text-taupe';

  return (
    <div
      className={`rounded border p-6 ${isAfter ? 'border-stencil' : 'border-cream-muted'} ${isFilled ? 'bg-stencil' : ''} ${className}`}
    >
      <p
        className={`mb-2 font-body text-sm leading-[21px] font-semibold uppercase ${isAfter ? (isFilled ? 'text-cream' : 'text-stencil') : mutedTextClass}`}
      >
        {label}
      </p>
      <ul
        className={`list-disc space-y-1 pl-5 font-body text-sm leading-[21px] ${isAfter ? 'text-cream' : mutedTextClass}`}
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function CompareColumns({
  tone = 'dark',
  before,
  after,
}: {
  tone?: 'dark' | 'light';
  before: { label: string; items: string[] };
  after: { label: string; items: string[] };
}) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <CompareColumn
        tone={tone}
        label={before.label}
        items={before.items}
        variant="before"
        className="col-span-12 lg:col-span-6"
      />
      <CompareColumn
        tone={tone}
        label={after.label}
        items={after.items}
        variant="after"
        className="col-span-12 lg:col-span-6"
      />
    </div>
  );
}

const ctaButtonVariants = {
  light: 'border-panel bg-panel text-ink',
  dark: 'border-ink bg-ink text-cream',
};

export function CtaButton({
  href,
  children,
  variant = 'light',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof ctaButtonVariants;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center border-2 px-6 py-4 font-body text-sm font-medium uppercase ${ctaButtonVariants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
