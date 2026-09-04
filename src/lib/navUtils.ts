import { m } from '@/paraglide/messages';
import { getLocale, localizeHref } from '@/paraglide/runtime';
import type { NavLink } from '@/components/landing/Hero';
import { SECTION_IDS } from '@/components/landing/anchors';

export const getLandingNavLinks = (): NavLink[] => {
  const locale = getLocale();
  const home = localizeHref('/', { locale });

  return [
    { label: m.landing_nav_app, href: `${home}#${SECTION_IDS.app}` },
    { label: m.landing_nav_features, href: `${home}#${SECTION_IDS.features}` },
    { label: m.landing_nav_pricing, href: `${home}#${SECTION_IDS.pricing}` },
    { label: m.landing_nav_join, href: `${home}#${SECTION_IDS.join}` },
    { label: m.landing_nav_blog, href: localizeHref('/blog') },
    { label: m.landing_nav_open_app, href: 'https://pro.tattou.ink' },
  ];
};
