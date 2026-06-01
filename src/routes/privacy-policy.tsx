import { Markdown } from '@/components/Markdown';
import { getLocaleForUrl } from '@/paraglide/runtime';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { allStatics } from 'content-collections';
import { localizedPathNames } from '../../i18n/lib';
import type { FileRoutesByTo } from '@/routeTree.gen';

type RoutePath = keyof FileRoutesByTo;

export const Route = createFileRoute('/privacy-policy')({
  component: RouteComponent,
  loader: ({ location, route }) => {
    const locale = getLocaleForUrl(location.publicHref);
    if (!Object.keys(localizedPathNames).includes(route.id)) {
      throw notFound();
    }
    const localizedPathName = localizedPathNames[route.id as RoutePath][locale];
    const page = allStatics.find((p) => `/${p.slug}` === localizedPathName);
    if (!page) {
      throw notFound();
    }
    return { page };
  },
});

function RouteComponent() {
  const { page } = Route.useLoaderData();
  return (
    <main className="p-4 md:p-8 lg:px-16">
      <Markdown content={page.content} className="prose" />
    </main>
  );
}
