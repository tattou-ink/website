import { Markdown } from '@/components/Markdown';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { allStatics } from 'content-collections';

export const Route = createFileRoute('/politique-de-confidentialite')({
  component: RouteComponent,
  loader: () => {
    const page = allStatics.find(
      (p) => p.slug === 'politique-de-confidentialite',
    );
    if (!page) {
      throw notFound();
    }
    return { page };
  },
});

function RouteComponent() {
  const { page } = Route.useLoaderData();
  return (
    <article>
      <Markdown content={page.content} className="prose" />
    </article>
  );
}
