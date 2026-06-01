// src/components/Markdown.tsx
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import type { MarkdownResult } from '@/utils/markdown';

type MarkdownProps = { markdown: MarkdownResult; className?: string };

export function Markdown({ markdown, className }: MarkdownProps) {
  const content = toJsxRuntime(markdown.tree, {
    Fragment,
    jsx,
    jsxs,
    components: {
      a: ({ href, children, ...props }: any) => {
        if (href?.startsWith('/')) {
          return <Link to={href}>{children}</Link>;
        }
        return (
          <a href={href} {...props}>
            {children}
          </a>
        );
      },
      hr: () => <hr className="my-5" />,
      ul: ({ children }: any) => (
        <ul className="list-disc pl-6 [&>li]:mt-1">{children}</ul>
      ),
      li: ({ children }: any) => <li>{children}</li>,
      h1: ({ children, ...props }: any) => (
        <h1 className="mt-10 mb-2 text-4xl" {...props}>
          {children}
        </h1>
      ),
      h2: ({ children, ...props }: any) => (
        <h2 className="mt-6 mb-2 text-3xl" {...props}>
          {children}
        </h2>
      ),
      h3: ({ children, ...props }: any) => (
        <h3 className="mt-3 mb-2 text-2xl" {...props}>
          {children}
        </h3>
      ),
      h4: ({ children, ...props }: any) => (
        <h4 className="mt-1 mb-2 text-xl" {...props}>
          {children}
        </h4>
      ),
      p: ({ children }: any) => <p className="mt-1">{children}</p>,
      table: ({ children }: any) => (
        <table className="my-2 w-full">{children}</table>
      ),
      tr: ({ children }: any) => (
        <tr className="m-0 border-t p-0 even:bg-muted">{children}</tr>
      ),
      th: ({ children }: any) => (
        <th className="border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right">
          {children}
        </th>
      ),
      td: ({ children }: any) => (
        <td className="border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right">
          {children}
        </td>
      ),
      img: ({ src, alt }: any) => (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="rounded-lg shadow-md"
        />
      ),
    },
  });

  return <div className={className}>{content}</div>;
}
