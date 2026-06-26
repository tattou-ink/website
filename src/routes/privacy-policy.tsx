import { Markdown } from '@/components/Markdown';
import { extractLocaleFromUrl } from '@/paraglide/runtime';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { allStatics } from 'content-collections';
import { localizedPathNames } from '../../i18n/lib';
import type { PublicRoutePath } from '../../i18n/lib';
import { renderMarkdown } from '@/utils/markdown';

export const Route = createFileRoute('/privacy-policy')({
  component: RouteComponent,
  loader: async ({ location, route }) => {
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

    return { markdown };
  },
});

function RouteComponent() {
  const { markdown } = Route.useLoaderData();
  return (
    <main className="p-4 md:p-8 lg:px-16">
      <Markdown markdown={markdown} className="prose" />
    </main>
  );
}
