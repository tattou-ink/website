import type { Locale } from '@/paraglide/runtime';
import type { BlogPost } from '@/lib/blogUtils';

export const BASE_URL = 'https://tattou.ink';

const ORGANIZATION_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

export function getOrganizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'tattou.ink',
    url: BASE_URL,
    logo: `${BASE_URL}/tattouink_512x512.png`,
    email: 'contact@tattou.ink',
    sameAs: [
      'https://instagram.com/tattou.ink',
      'https://instagram.com/tattou.ink_fr',
      'https://instagram.com/tattou.ink_es',
    ],
  };
}

export function getWebsiteNode(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: BASE_URL,
    name: 'tattou.ink',
    inLanguage: locale,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function getBreadcrumbNode(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getBlogPostingNode({
  post,
  url,
  locale,
}: {
  post: BlogPost;
  url: string;
  locale: Locale;
}) {
  const image = post.heroImage.startsWith('http')
    ? post.heroImage
    : `${BASE_URL}${post.heroImage}`;
  const datePublished = post.published.toISOString();

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    headline: post.title,
    description: post.description,
    image,
    inLanguage: locale,
    datePublished,
    dateModified: datePublished,
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function jsonLdScript(nodes: Array<Record<string, unknown>>) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': nodes,
    }),
  };
}
