import { extractLocaleFromUrl } from '@/paraglide/runtime';
import type { Locale } from '@/paraglide/runtime';
import { renderMarkdown } from '@/utils/markdown';
import { notFound } from '@tanstack/router-core';
import type { ParsedLocation, AnyRoute } from '@tanstack/router-core';
import { allBlogPosts } from 'content-collections';
import { localizedPathNames } from '../../i18n/lib';
import type { PublicRoutePath } from '../../i18n/lib';
import { getLanguagePrefix } from './languageUtils';

type BlogPost = (typeof allBlogPosts)[number];

export function resolveBlogPostByRouteId(routeId: string, locale: Locale) {
  const localizedPathName =
    localizedPathNames[routeId as PublicRoutePath][locale];
  if (!localizedPathName) return undefined;

  const post = allBlogPosts.find((p) => `/${p.slug}` === localizedPathName);
  if (!post) return undefined;

  return { post, href: localizedPathName };
}

export function getAllBlogPosts(locale: Locale) {
  return Object.keys(localizedPathNames)
    .filter((routeId) => routeId.startsWith('/blog/'))
    .map((routeId) => {
      const blogPost = resolveBlogPostByRouteId(routeId, locale);
      if (!blogPost) return blogPost;
      const { post, href } = blogPost;
      return { post, href: `${getLanguagePrefix(locale)}${href}` };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .sort((a, b) => b.post.published.getTime() - a.post.published.getTime());
}

export async function getBlogArticleDataOrThrowNotFound(
  location: ParsedLocation<{}>,
  route: AnyRoute,
) {
  const locale =
    extractLocaleFromUrl(`https://tattou.ink${location.publicHref}`) || 'en';

  const resolved = resolveBlogPostByRouteId(route.id, locale);
  if (!resolved) {
    throw notFound();
  }
  const { post, href } = resolved;

  const markdown = await renderMarkdown(post.content);

  const related = (post.relatedArticles ?? [])
    .map((routeId) => resolveBlogPostByRouteId(routeId, locale))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return {
    post,
    markdown,
    related,
    href: `${getLanguagePrefix(locale)}${href}`,
    locale,
  };
}

const dateFormatterByLocale: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
  fr: new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
};

export function formatBlogDate(date: Date, locale: Locale) {
  return dateFormatterByLocale[locale].format(date);
}

// Native pixel dimensions of each hero image, used to set explicit
// width/height on <img> and avoid layout shift while it loads.
const heroImageDimensions: Record<string, { width: number; height: number }> = {
  '/images/blog/what-to-ask-customers-before-tattoo-session.jpg': {
    width: 2728,
    height: 3529,
  },
  '/images/blog/how-to-appear-professional-to-tattoo-clients.jpg': {
    width: 2000,
    height: 2154,
  },
};

const DEFAULT_HERO_IMAGE_DIMENSIONS = { width: 2000, height: 2154 };

export function getHeroImageDimensions(heroImage: string) {
  return heroImageDimensions[heroImage] ?? DEFAULT_HERO_IMAGE_DIMENSIONS;
}

export type { BlogPost };
