import type { MarkdownResult } from '@/utils/markdown';
import { getLocale, localizeHref } from '@/paraglide/runtime';
import type { BlogPost } from '@/lib/blogUtils';
import { formatBlogDate } from '@/lib/blogUtils';

import { Markdown } from '@/components/Markdown';
import { Footer } from '@/components/Footer';
import { SmartCtaButton } from '@/components/SmartCtaButton';
import { Header } from '@/components/landing/Hero';
import type { NavLink } from '@/components/landing/Hero';
import {
  Eyebrow,
  Heading,
  Highlight,
  CtaButton,
} from '@/components/landing/ui';

import { BlogHero } from './BlogHero';
import { BlogRelatedArticles } from './BlogRelatedArticles';
import { getBlogNavLinks } from './blogNav';
import React, { useEffect, useState } from 'react';

const getChildrenWithHeaderProps = (children: React.ReactNode) =>
  React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // @ts-ignore - Custom props.
        inHeader: true,
      });
    }
    return child;
  });

const markdownComponents = {
  h1: ({ children }: any) => {
    const childrenWithProps = getChildrenWithHeaderProps(children);
    return (
      <Heading level={1} className="mb-8 text-ink">
        {childrenWithProps}
      </Heading>
    );
  },
  h2: ({ children, ...props }: any) => (
    <h2
      className="mt-8 font-display text-xl leading-tight font-black text-ink uppercase lg:text-2xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3
      className="mt-6 font-display text-lg leading-tight font-black text-ink uppercase"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="mt-3 font-body text-sm leading-[21px] text-charcoal-700">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="mt-3 list-['•'] space-y-1 pl-4 font-body text-sm leading-[21px] text-charcoal-700 *:pl-2">
      {children}
    </ul>
  ),
  a: ({ children, inHeader, ...props }: any) => {
    if (inHeader) {
      const childrenWithProps = getChildrenWithHeaderProps(children);
      return <a {...props}>{childrenWithProps}</a>;
    }
    return <a {...props}>{children}</a>;
  },
  li: ({ children }: any) => <li>{children}</li>,
  strong: ({ children, ...props }: any) => {
    if (props.inHeader) {
      return <Highlight tone="light">{children}</Highlight>;
    }
    return <strong className={'font-semibold text-ink'}>{children}</strong>;
  },
  pre: ({ children }: any) => (
    <pre className="my-3 overflow-scroll rounded border border-charcoal-500 px-6 py-3 text-sm">
      {children}
    </pre>
  ),
};

export function BlogArticleTemplate({
  post,
  markdown,
  related,
}: {
  post: BlogPost;
  markdown: MarkdownResult;
  related: Array<{ post: BlogPost; href: string }>;
}) {
  const locale = getLocale();

  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    setNavLinks(getBlogNavLinks());
  }, []);

  return (
    <main className="w-full bg-panel">
      <Header navLinks={navLinks} theme="light" />
      <BlogHero src={post.heroImage} />

      <article className="mx-auto flex w-full max-w-[800px] flex-col gap-4 px-5 py-16 lg:px-0 lg:py-24">
        <div className="flex flex-col">
          <Eyebrow theme="light">
            {post.category} / {formatBlogDate(post.published, locale)}
          </Eyebrow>
        </div>

        <Markdown markdown={markdown} components={markdownComponents} />

        {post.cta.type === 'app' ? (
          <SmartCtaButton
            label={post.cta.label}
            variant="dark"
            className="self-start"
          />
        ) : (
          <CtaButton
            href={`${localizeHref('/')}${post.cta.anchor ? `#${post.cta.anchor}` : ''}`}
            variant="dark"
            className="self-start"
          >
            {post.cta.label}
          </CtaButton>
        )}
      </article>

      <BlogRelatedArticles related={related} />

      <Footer
        mergeWithPreviousDarkSection={false}
        theme="light"
        withSeparator
      />
    </main>
  );
}
