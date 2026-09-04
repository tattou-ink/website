import { m } from '@/paraglide/messages';
import type { BlogPost } from '@/lib/blogUtils';

import { Header } from '@/components/landing/Hero';
import type { NavLink } from '@/components/landing/Hero';
import { Footer } from '@/components/Footer';
import { Eyebrow, Heading, Highlight } from '@/components/landing/ui';

import { BlogArticleCard } from './BlogArticleCard';
import { BlogPagination } from './BlogPagination';
import { getBlogNavLinks } from './blogNav';
import { useEffect, useState } from 'react';
import { ParaglideMessage } from '@inlang/paraglide-js-react';

export function BlogIndexPage({
  posts,
  currentPage,
  totalPages,
}: {
  posts: Array<{ post: BlogPost; href: string }>;
  currentPage: number;
  totalPages: number;
}) {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    setNavLinks(getBlogNavLinks());
  }, []);

  return (
    <main className="w-full bg-panel">
      <Header navLinks={navLinks} theme="light" />

      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-12 px-5 py-16 lg:px-20 lg:py-24">
        <div className="flex flex-col gap-4">
          <Eyebrow theme="light">{m.blog_index_eyebrow()}</Eyebrow>
          <Heading className="text-ink">
            <ParaglideMessage
              message={m.blog_index_title_line}
              markup={{
                b: ({ children }) => (
                  <Highlight tone="light">{children}</Highlight>
                ),
              }}
            />
          </Heading>
          <p className="max-w-[560px] font-body text-base leading-[24px] text-charcoal-700">
            {m.blog_index_subtitle()}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
            {posts.map(({ post, href }) => (
              <BlogArticleCard
                key={href}
                post={post}
                href={href}
                className="flex flex-col gap-3"
              />
            ))}
          </div>
        ) : null}

        <BlogPagination currentPage={currentPage} totalPages={totalPages} />
      </div>

      <Footer
        mergeWithPreviousDarkSection={false}
        theme="light"
        withSeparator
      />
    </main>
  );
}
