import { useEffect, useState } from 'react';

import { m } from '@/paraglide/messages';
import { localizeHref } from '@/paraglide/runtime';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

import { LangSwitcher } from '@/components/LangSwitcher';
import { SECTION_IDS } from './anchors';
import { CtaButton, Highlight } from './ui';
import { Link } from '@tanstack/react-router';

export type NavLink = { label: () => string } & (
  | { href: string }
  | { hash: string }
  | { path: string; hash?: string }
);

const defaultNavLinks: NavLink[] = [
  { label: m.landing_nav_app, path: '/', hash: SECTION_IDS.app },
  { label: m.landing_nav_features, hash: SECTION_IDS.features },
  { label: m.landing_nav_pricing, hash: SECTION_IDS.pricing },
  { label: m.landing_nav_join, hash: SECTION_IDS.join },
  { label: m.landing_nav_blog, path: '/blog' },
  { label: m.landing_nav_open_app, href: 'https://pro.tattou.ink' },
];

export function Header({
  navLinks = defaultNavLinks,
  theme = 'dark',
}: { navLinks?: NavLink[]; theme?: 'dark' | 'light' } = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!isDark) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDark]);

  const renderNavLink = ({
    link,
    label,
    className,
    onClick,
  }: {
    link: NavLink;
    label: string;
    className: string;
    onClick?: () => void;
  }) => {
    if ('path' in link) {
      return (
        <Link
          key={label}
          to={localizeHref(link.path)}
          hash={link.hash}
          className={className}
          onClick={onClick}
        >
          {label}
        </Link>
      );
    }
    if ('href' in link) {
      return (
        <a key={label} href={link.href} className={className} onClick={onClick}>
          {label}
        </a>
      );
    }
    return (
      <Link
        key={label}
        to={'.'}
        hash={link.hash}
        className={className}
        onClick={onClick}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className={cn(
        'z-20 flex items-center justify-between px-4 transition-all duration-300 lg:px-12',
        isDark
          ? cn(
              'fixed inset-x-0 top-0',
              isScrolled ? 'h-16 bg-ink shadow-md' : 'h-24 bg-transparent',
            )
          : 'sticky top-0 h-12 bg-panel shadow-sm lg:h-16',
      )}
    >
      <Link
        to={localizeHref('/')}
        hash={SECTION_IDS.top}
        className="block h-[18px] w-auto shrink-0 lg:h-[41px]"
      >
        <img
          src={
            isDark
              ? '/images/landing/logo.svg'
              : '/images/landing/logo-dark.svg'
          }
          alt="tattou.ink"
          className="h-full w-auto"
        />
      </Link>

      <div className="hidden items-center gap-12 lg:flex">
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => {
            const label = link.label();
            const className = cn(
              'px-2 py-1 font-body text-base leading-[26px] font-bold uppercase hover:opacity-70',
              isDark ? 'text-cream' : 'text-ink',
            );
            return renderNavLink({ link, label, className });
          })}
        </nav>
        <LangSwitcher theme={theme} />
      </div>

      <button
        type="button"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="flex w-6 shrink-0 flex-col gap-1 lg:hidden"
      >
        {menuOpen ? (
          <X className={cn('size-6', isDark ? 'text-cream' : 'text-ink')} />
        ) : (
          <>
            <span
              className={cn('h-px w-full', isDark ? 'bg-cream' : 'bg-ink')}
            />
            <span
              className={cn('h-px w-full', isDark ? 'bg-cream' : 'bg-ink')}
            />
            <span
              className={cn('h-px w-full', isDark ? 'bg-cream' : 'bg-ink')}
            />
          </>
        )}
      </button>

      {menuOpen ? (
        <>
          <div
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
            className={cn(
              'fixed inset-x-0 bottom-0 z-10 transition-all duration-300 lg:hidden',
              isDark
                ? cn('bg-ink/60', isScrolled ? 'top-16' : 'top-24')
                : 'top-12 bg-ink/40 lg:top-16',
            )}
          />
          <div
            className={cn(
              'absolute top-full right-0 left-0 z-20 flex flex-col gap-6 px-4 py-8 lg:hidden',
              isDark ? 'bg-ink' : 'bg-panel',
            )}
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const label = link.label();
                const className = cn(
                  'font-body text-base leading-[26px] font-bold uppercase',
                  isDark ? 'text-cream' : 'text-ink',
                );

                return renderNavLink({
                  link,
                  label,
                  className,
                  onClick: () => setMenuOpen(false),
                });
              })}
            </nav>
            <LangSwitcher theme={theme} />
          </div>
        </>
      ) : null}
    </header>
  );
}

export function Hero() {
  return (
    <section
      id={SECTION_IDS.top}
      className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-ink"
    >
      <img
        src="/images/landing/hero-photo.jpg"
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover object-[47%_30%] lg:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(28,25,23,0.55),rgba(28,25,23,0)_60%)] lg:hidden" />

      <div className="relative z-10 flex flex-1 px-5 pt-40 lg:px-20 lg:pt-60">
        <div className="flex flex-col items-start gap-8 lg:max-w-140">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col items-start gap-1">
              <p className="font-script text-[18px] text-cream lg:text-[28px]">
                {m.landing_hero_script()}
              </p>
              <h1 className="font-display text-[40px] leading-[40px] font-black text-cream uppercase lg:text-[70px] lg:leading-[70px]">
                {m.landing_hero_title_line1()}
                <br />
                <Highlight tone="brand">
                  {m.landing_hero_title_line2()}
                </Highlight>
              </h1>
            </div>
            <p className="max-w-[268px] font-body text-base leading-4 font-medium text-cream lg:max-w-none">
              {m.landing_hero_subline()}
            </p>
          </div>
          <CtaButton href={`#${SECTION_IDS.features}`}>
            {m.landing_hero_cta()}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
