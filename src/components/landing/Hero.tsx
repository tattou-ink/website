import { useState } from 'react';

import { m } from '@/paraglide/messages';
import type { Locale } from '@/paraglide/runtime';
import { getLocale, setLocale } from '@/paraglide/runtime';
import { X } from 'lucide-react';

import { SECTION_IDS } from './anchors';
import { CtaButton, Highlight } from './ui';

const navLinks = [
  { label: m.landing_nav_app, href: `#${SECTION_IDS.app}` },
  { label: m.landing_nav_features, href: `#${SECTION_IDS.features}` },
  { label: m.landing_nav_pricing, href: `#${SECTION_IDS.pricing}` },
  { label: m.landing_nav_join, href: `#${SECTION_IDS.join}` },
  {
    label: m.landing_nav_blog,
    href: '/blog/what-to-ask-customers-before-tattoo-session',
  },
];

function LangSwitcher({ className = '' }: { className?: string }) {
  const locale = getLocale();
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {(['fr', 'en'] as Locale[]).map((lng, i) => (
        <div key={lng} className="flex items-center">
          <button
            type="button"
            onClick={() => setLocale(lng)}
            className={`p-1 font-body text-base uppercase ${
              locale === lng
                ? 'text-cream underline'
                : 'text-cream-muted hover:text-cream'
            }`}
          >
            {lng}
          </button>
          {i === 0 ? <span className="px-0.5 text-cream">·</span> : null}
        </div>
      ))}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20 flex h-24 items-center justify-between px-4 lg:px-12">
      <a
        href={`#${SECTION_IDS.top}`}
        className="block h-[18px] w-auto shrink-0 lg:h-[41px]"
      >
        <img
          src="/images/landing/logo.svg"
          alt="Tattou.ink"
          className="h-full w-auto"
        />
      </a>

      <div className="hidden items-center gap-12 lg:flex">
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-2 py-1 font-body text-base leading-[26px] font-bold text-cream uppercase hover:opacity-70"
            >
              {link.label()}
            </a>
          ))}
        </nav>
        <LangSwitcher />
      </div>

      <button
        type="button"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="flex w-6 shrink-0 flex-col gap-1 lg:hidden"
      >
        {menuOpen ? (
          <X className="size-6 text-cream" />
        ) : (
          <>
            <span className="h-px w-full bg-cream" />
            <span className="h-px w-full bg-cream" />
            <span className="h-px w-full bg-cream" />
          </>
        )}
      </button>

      {menuOpen ? (
        <div className="absolute top-full right-0 left-0 flex flex-col gap-6 bg-ink px-4 py-8 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-base leading-[26px] font-bold text-cream uppercase"
              >
                {link.label()}
              </a>
            ))}
          </nav>
          <LangSwitcher />
        </div>
      ) : null}
    </header>
  );
}

export function Hero() {
  return (
    <section
      id={SECTION_IDS.top}
      className="relative isolate flex min-h-[874px] w-full flex-col overflow-hidden bg-ink lg:min-h-[900px]"
    >
      <img
        src="/images/landing/hero-photo.jpg"
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover object-[70%_30%] lg:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(28,25,23,0.55),rgba(28,25,23,0)_60%)] lg:hidden" />

      <Header />

      <div className="relative z-10 flex flex-1 items-center px-5 lg:px-20">
        <div className="flex max-w-[362px] flex-col items-start gap-8 lg:max-w-[519px]">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col items-start gap-1">
              <p className="font-script text-[18px] text-cream lg:text-[28px]">
                {m.landing_hero_script()}
              </p>
              <h1 className="font-display text-[40px] leading-[40px] font-black text-cream lg:text-[70px] lg:leading-[70px]">
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
          <CtaButton href={`#${SECTION_IDS.join}`}>
            {m.landing_hero_cta()}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
