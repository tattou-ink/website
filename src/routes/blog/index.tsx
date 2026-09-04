import { createFileRoute } from '@tanstack/react-router';
import { extractLocaleFromUrl } from '@/paraglide/runtime';
import { m } from '@/paraglide/messages';
import { getAllBlogPosts } from '@/lib/blogUtils';
import { BlogIndexPage } from '@/components/blog/BlogIndexPage';

const POSTS_PER_PAGE = 9;

export const Route = createFileRoute('/blog/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { page: number } => {
    const page = Number(search.page);
    return { page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1 };
  },
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ location, deps }) => {
    const locale =
      extractLocaleFromUrl(`https://tattou.ink${location.publicHref}`) || 'en';
    const allPosts = getAllBlogPosts(locale);
    const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
    const currentPage = Math.min(deps.page, totalPages);
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

    return { posts, currentPage, totalPages };
  },
  head: () => {
    const title = m.blog_index_title_line();
    const description = m.blog_index_subtitle();
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
    };
  },
});

function RouteComponent() {
  const { posts, currentPage, totalPages } = Route.useLoaderData();
  return (
    <BlogIndexPage
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
