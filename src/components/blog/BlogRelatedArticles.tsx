import { m } from '@/paraglide/messages';
import type { BlogPost } from '@/lib/blogUtils';

import { Heading } from '@/components/landing/ui';
import { BlogArticleCard } from './BlogArticleCard';

export function BlogRelatedArticles({
  related,
}: {
  related: Array<{ post: BlogPost; href: string }>;
}) {
  if (related.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-8 border-t border-charcoal-300 px-5 py-16 lg:px-20 lg:py-24">
      <Heading className="text-ink">{m.blog_related_heading()}</Heading>
      <div className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {related.map(({ post, href }) => (
          <BlogArticleCard key={href} post={post} href={href} />
        ))}
      </div>
    </div>
  );
}
