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
    <main className='p-4 md:p-8 lg:p-16'>

    <article>
      <Markdown content={page.content} className="prose" />
    </article>
    </main>
  );
}
