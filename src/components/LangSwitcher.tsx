import type { Locale } from '@/paraglide/runtime';
import { getLocale, setLocale } from '@/paraglide/runtime';
import { cn } from '@/lib/utils';

const themeClasses = {
  dark: {
    active: 'text-cream underline',
    inactive: 'text-cream-muted hover:text-cream',
    separator: 'text-cream',
  },
  light: {
    active: 'text-ink underline',
    inactive: 'text-taupe hover:text-ink',
    separator: 'text-ink',
  },
};

export function LangSwitcher({
  theme = 'dark',
  className = '',
}: {
  theme?: keyof typeof themeClasses;
  className?: string;
}) {
  const locale = getLocale();
  const colors = themeClasses[theme];

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {(['fr', 'en'] as Locale[]).map((lng, i) => (
        <div key={lng} className="flex items-center">
          <button
            type="button"
            onClick={() => setLocale(lng)}
            className={cn(
              'p-1 font-body text-base uppercase',
              locale === lng ? colors.active : colors.inactive,
            )}
          >
            {lng}
          </button>
          {i === 0 ? (
            <span className={cn('px-0.5', colors.separator)}>·</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
