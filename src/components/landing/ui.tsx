import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

export function Eyebrow({
  children,
  theme,
}: {
  children: ReactNode;
  theme: 'dark' | 'light';
}) {
  return (
    <p
      className={cn(
        'font-body text-[11px] leading-[15px] font-medium uppercase',
        theme === 'dark'
          ? 'text-accent-highlight-dark'
          : 'text-accent-highlight',
      )}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  className = '',
  level,
}: {
  children: ReactNode;
  className?: string;
  level?: 1 | 2;
}) {
  if (level === 1) {
    return (
      <h1
        className={`font-display text-[32px] leading-[34px] font-black uppercase lg:text-[48px] lg:leading-[50px] ${className}`}
      >
        {children}
      </h1>
    );
  }
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
  const isFilledAndDark = tone === 'dark';
  const isFilledAndLight = isAfter && tone === 'light';
  const mutedTextClass = tone === 'dark' ? 'text-cream-muted' : 'text-taupe';

  return (
    <div
      className={cn(
        `rounded border p-6`,
        isFilledAndLight ? 'bg-stencil' : '',
        isFilledAndDark && 'bg-ink',
        isAfter
          ? tone === 'light'
            ? 'border-stencil'
            : 'border-accent-highlight-dark'
          : 'border-cream-muted',
        className,
      )}
    >
      <p
        className={`mb-2 font-body text-sm leading-[21px] font-semibold uppercase ${isAfter ? (isFilledAndLight ? 'text-cream' : 'text-accent-highlight-dark') : mutedTextClass}`}
      >
        {label}
      </p>
      <ul
        className={`list-["•"] space-y-1 pl-2 font-body text-sm leading-[21px] *:pl-2 ${isAfter ? 'text-cream' : mutedTextClass}`}
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
  forceColumnDisplay,
}: {
  tone?: 'dark' | 'light';
  before: { label: string; items: string[] };
  after: { label: string; items: string[] };
  forceColumnDisplay?: boolean;
}) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <CompareColumn
        tone={tone}
        label={before.label}
        items={before.items}
        variant="before"
        className={cn(
          forceColumnDisplay ? 'col-span-12' : 'col-span-12 lg:col-span-6',
        )}
      />
      <CompareColumn
        tone={tone}
        label={after.label}
        items={after.items}
        variant="after"
        className={cn(
          forceColumnDisplay ? 'col-span-12' : 'col-span-12 lg:col-span-6',
        )}
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
  disabled = false,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof ctaButtonVariants;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const sharedClassName = `inline-flex items-center justify-center border-2 px-6 py-4 font-body text-sm font-medium uppercase ${ctaButtonVariants[variant]} ${className}`;

  if (disabled) {
    return <span className={`${sharedClassName} opacity-40`}>{children}</span>;
  }
  if (href) {
    return (
      <a href={href} onClick={onClick} className={sharedClassName}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={sharedClassName}>
      {children}
    </button>
  );
}

export function Select({
  value,
  onValueChange,
  options,
  className = '',
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        className={cn(
          'inline-flex items-center justify-between gap-2 border border-cream-muted bg-panel px-4 py-3 font-body text-sm font-medium text-ink uppercase outline-none data-[placeholder]:text-taupe',
          className,
        )}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <ChevronDown className="size-4 text-taupe" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className="z-50 overflow-hidden border border-cream-muted bg-panel shadow-lg"
        >
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1 text-taupe">
            <ChevronUp className="size-4" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="relative flex cursor-default items-center gap-2 py-2 pr-8 pl-3 font-body text-sm text-ink uppercase outline-none select-none data-[highlighted]:bg-stencil data-[highlighted]:text-cream"
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2 flex items-center justify-center">
                  <Check className="size-4" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1 text-taupe">
            <ChevronDown className="size-4" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
