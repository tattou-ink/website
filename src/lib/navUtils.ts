import { m } from '@/paraglide/messages';
import type { NavLink } from '@/components/landing/Hero';
import { SECTION_IDS } from '@/components/landing/anchors';

export const getLandingNavLinks = (): NavLink[] => {
  return [
    { label: m.landing_nav_app, path: '/', hash: SECTION_IDS.app },
    { label: m.landing_nav_features, hash: SECTION_IDS.features },
    { label: m.landing_nav_pricing, hash: SECTION_IDS.pricing },
    { label: m.landing_nav_join, hash: SECTION_IDS.join },
    { label: m.landing_nav_blog, path: '/blog' },
    { label: m.landing_nav_open_app, href: 'https://pro.tattou.ink' },
  ];
};
