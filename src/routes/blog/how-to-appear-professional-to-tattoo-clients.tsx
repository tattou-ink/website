import { createFileRoute } from '@tanstack/react-router';
import { BlogArticleTemplate } from '@/components/blog/BlogArticleTemplate';
import { getBlogArticleDataOrThrowNotFound } from '@/lib/blogUtils';

export const Route = createFileRoute(
  '/blog/how-to-appear-professional-to-tattoo-clients',
)({
  component: RouteComponent,
  loader: async ({ location, route }) => {
    const { post, markdown, related } = await getBlogArticleDataOrThrowNotFound(
      location,
      route,
    );

    return { post, markdown, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    return {
      meta: [
        { title: post.title },
        { name: 'description', content: post.description },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.description },
        { property: 'og:image', content: post.heroImage },
        { name: 'twitter:title', content: post.title },
        { name: 'twitter:description', content: post.description },
      ],
    };
  },
});

function RouteComponent() {
  const { post, markdown, related } = Route.useLoaderData();
  return <BlogArticleTemplate post={post} markdown={markdown} related={related} />;
}
