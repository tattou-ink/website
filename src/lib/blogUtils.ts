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
  const { post } = resolved;

  const markdown = await renderMarkdown(post.content);

  const related = (post.relatedArticles ?? [])
    .map((routeId) => resolveBlogPostByRouteId(routeId, locale))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return { post, markdown, related };
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

export type { BlogPost };
