import { m } from '@/paraglide/messages';
import { getLocale, localizeHref } from '@/paraglide/runtime';
import { Link } from '@tanstack/react-router';

import { SECTION_IDS } from './landing/anchors';
import { cn } from '@/lib/utils';

const locale = getLocale();
const home = localizeHref('/');

const navLinks = [
  { label: m.landing_nav_app, href: `${home}#${SECTION_IDS.app}` },
  { label: m.landing_nav_features, href: `${home}#${SECTION_IDS.features}` },
  { label: m.landing_nav_pricing, href: `${home}#${SECTION_IDS.pricing}` },
  { label: m.landing_nav_join, href: `${home}#${SECTION_IDS.join}` },
  {
    label: m.landing_nav_blog,
    href: localizeHref('/blog'),
  },
  {
    label: m.landing_footer_instagram,
    href:
      locale === 'fr'
        ? 'https://instagram.com/tattou.ink_fr'
        : 'https://instagram.com/tattou.ink',
  },
  { label: m.landing_footer_contact, href: 'mailto:contact@tattou.ink' },
];

const Separator = ({ theme }: { theme: 'dark' | 'light' }) => (
  <span
    className={cn(
      'px-2',
      theme === 'dark' ? 'text-cream-muted' : 'text-charcoal-600',
    )}
  >
    ·
  </span>
);

export function Footer({
  mergeWithPreviousDarkSection,
  theme,
  withSeparator,
}: {
  mergeWithPreviousDarkSection: boolean;
  theme: 'dark' | 'light';
  withSeparator?: boolean;
}) {
  const linkClass = cn(
    'font-body text-sm uppercase hover:opacity-70',
    theme === 'dark' && 'text-cream',
  );

  const mutedClass = cn(
    'font-body text-sm uppercase',
    theme === 'dark' ? 'text-cream-muted' : 'text-charcoal-500',
  );

  return (
    <footer
      className={cn(
        'w-full px-5 lg:px-20',
        theme === 'dark' ? 'bg-ink' : 'bg-panel',
        mergeWithPreviousDarkSection ? 'pb-12' : 'py-12',
        withSeparator &&
          'relative before:content-[" "] before:absolute before:top-0 before:right-5 before:left-5 before:block before:border-b before:border-b-charcoal-300 lg:before:right-20 lg:before:left-20',
      )}
    >
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
        <a
          href={`${home}#${SECTION_IDS.top}`}
          className="block h-[41px] w-auto"
        >
          <img
            src={
              theme === 'dark'
                ? '/images/landing/logo.svg'
                : '/images/landing/logo-dark.svg'
            }
            alt="tattou.ink"
            className="h-full w-auto"
          />
        </a>

        <div className="flex flex-col items-center gap-3 text-center lg:items-end lg:text-right">
          <nav className="flex flex-wrap items-center justify-center gap-y-1 lg:justify-end">
            {navLinks.map((link, i) => (
              <span key={link.label()} className="flex items-center">
                {i > 0 ? <Separator theme={theme} /> : null}
                <a href={link.href} className={linkClass}>
                  {link.label()}
                </a>
              </span>
            ))}
          </nav>

          <div className="flex items-center justify-center">
            <Link to={localizeHref('/privacy-policy')} className={linkClass}>
              {m.landing_footer_privacy()}
            </Link>
            <Separator theme={theme} />
            <Link
              to={localizeHref('/terms-and-conditions')}
              className={linkClass}
            >
              {m.landing_footer_terms()}
            </Link>
          </div>

          <p className={mutedClass}>{m.landing_footer_copyright()}</p>
        </div>
      </div>
    </footer>
  );
}
