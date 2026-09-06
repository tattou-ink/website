import { createFileRoute } from '@tanstack/react-router';
import { m } from '@/paraglide/messages';
import { BlogArticleTemplate } from '@/components/blog/BlogArticleTemplate';
import { getBlogArticleDataOrThrowNotFound } from '@/lib/blogUtils';
import {
  BASE_URL,
  getBlogPostingNode,
  getBreadcrumbNode,
  getOrganizationNode,
  getWebsiteNode,
  jsonLdScript,
} from '@/lib/structuredData';
import { getLanguagePrefix } from '@/lib/languageUtils';

export const Route = createFileRoute(
  '/blog/how-to-appear-professional-to-tattoo-clients',
)({
  component: RouteComponent,
  loader: async ({ location, route }) => {
    const { post, markdown, related, href, locale } =
      await getBlogArticleDataOrThrowNotFound(location, route);

    return { post, markdown, related, href, locale };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post, href, locale } = loaderData;
    const url = `${BASE_URL}${href}`;
    const home = `${BASE_URL}${getLanguagePrefix(locale)}/`;
    const blogUrl = `${BASE_URL}${getLanguagePrefix(locale)}/blog`;
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
      scripts: [
        jsonLdScript([
          getOrganizationNode(),
          getWebsiteNode(locale),
          getBreadcrumbNode([
            { name: m.blog_nav_home(), url: home },
            { name: m.landing_nav_blog(), url: blogUrl },
            { name: post.title, url },
          ]),
          getBlogPostingNode({ post, url, locale }),
        ]),
      ],
    };
  },
});

function RouteComponent() {
  const { post, markdown, related } = Route.useLoaderData();
  return (
    <BlogArticleTemplate post={post} markdown={markdown} related={related} />
  );
}
