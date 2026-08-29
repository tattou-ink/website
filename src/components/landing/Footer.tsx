import { m } from '@/paraglide/messages';
import { localizeHref } from '@/paraglide/runtime';
import { Link } from '@tanstack/react-router';

import { SECTION_IDS } from './anchors';

const navLinks = [
  { label: m.landing_nav_app, href: `#${SECTION_IDS.app}` },
  { label: m.landing_nav_features, href: `#${SECTION_IDS.features}` },
  { label: m.landing_nav_pricing, href: `#${SECTION_IDS.pricing}` },
  { label: m.landing_nav_join, href: `#${SECTION_IDS.join}` },
  { label: m.landing_footer_instagram, href: null },
  { label: m.landing_footer_contact, href: null },
];

const linkClass = 'font-body text-cream text-sm uppercase hover:opacity-70';
const mutedClass = 'font-body text-cream-muted text-sm uppercase';
const separator = <span className="px-2 text-cream-muted">·</span>;

export function Footer() {
  return (
    <footer className="w-full bg-ink px-5 py-12 lg:px-20">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
        <a href={`#${SECTION_IDS.top}`} className="block h-[41px] w-auto">
          <img
            src="/images/landing/logo.svg"
            alt="Tattou.ink"
            className="h-full w-auto"
          />
        </a>

        <div className="flex flex-col items-center gap-3 text-center lg:items-end lg:text-right">
          <nav className="flex flex-wrap items-center justify-center gap-y-1 lg:justify-end">
            {navLinks.map((link, i) => (
              <span key={link.label()} className="flex items-center">
                {i > 0 ? separator : null}
                {link.href ? (
                  <a href={link.href} className={linkClass}>
                    {link.label()}
                  </a>
                ) : (
                  <span className={mutedClass}>{link.label()}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex items-center justify-center">
            <Link
              to={localizeHref('/privacy-policy', { locale: undefined })}
              className={linkClass}
            >
              {m.landing_footer_privacy()}
            </Link>
            {separator}
            <span className={mutedClass}>
              {m.landing_footer_legal_notice()}
            </span>
            {separator}
            <Link
              to={localizeHref('/terms-and-conditions', { locale: undefined })}
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
