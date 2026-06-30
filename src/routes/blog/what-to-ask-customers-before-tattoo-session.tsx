import { createFileRoute } from '@tanstack/react-router';
import { Markdown } from '@/components/Markdown';
import { getBlogArticleMarkdownOrThrowNotFound } from '@/lib/blogUtils';

export const Route = createFileRoute(
  '/blog/what-to-ask-customers-before-tattoo-session',
)({
  component: RouteComponent,
  loader: async ({ location, route }) => {
    const markdown = await getBlogArticleMarkdownOrThrowNotFound(
      location,
      route,
    );

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
