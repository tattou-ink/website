import { extractLocaleFromUrl } from '@/paraglide/runtime';
import { renderMarkdown } from '@/utils/markdown';
import { notFound } from '@tanstack/router-core';
import type { ParsedLocation, AnyRoute } from '@tanstack/router-core';
import { allStatics } from 'content-collections';
import { localizedPathNames } from '../../i18n/lib';

export async function getBlogArticleMarkdownOrThrowNotFound(
  location: ParsedLocation<{}>,
  route: AnyRoute,
) {
  const locale =
    extractLocaleFromUrl(`https://tattou.ink${location.publicHref}`) || 'en';
  if (!Object.keys(localizedPathNames).includes(route.id)) {
    throw notFound();
  }
  const localizedPathName =
    localizedPathNames[route.id as PublicRoutePath][locale];
  const page = allStatics.find((p) => `/${p.slug}` === localizedPathName);
  if (!page) {
    throw notFound();
  }

  const markdown = await renderMarkdown(page.content);
  return markdown;
}
