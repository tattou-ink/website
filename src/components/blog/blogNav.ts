import { m } from '@/paraglide/messages';
import { localizeHref } from '@/paraglide/runtime';
import type { NavLink } from '@/components/landing/Hero';

export const getBlogNavLinks = (): NavLink[] => [
  { label: m.blog_nav_home, href: localizeHref('/') },
  { label: m.landing_nav_blog, href: localizeHref('/blog') },
];
