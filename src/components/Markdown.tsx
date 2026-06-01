import parse, { domToReact, Element } from 'html-react-parser';
import type { DOMNode, HTMLReactParserOptions } from 'html-react-parser';
import type { MarkdownResult } from '@/utils/markdown';
import { renderMarkdown } from '@/utils/markdown';
import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';

type MarkdownProps = { content: string; className?: string };

const headingRegex = /^h([123456])$/;

export function Markdown({ content, className }: MarkdownProps) {
  const [result, setResult] = useState<MarkdownResult | null>(null);

  useEffect(() => {
    renderMarkdown(content).then(setResult);
  }, [content]);

  if (!result) {
    return <div className={className}>Loading...</div>;
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const children = domNode.children as DOMNode[];
        // Customize rendering of specific elements
        if (domNode.name === 'a') {
          // Handle links
          const href = domNode.attribs.href;
          if (href.startsWith('/')) {
            // Internal link - use your router's Link component
            return <Link to={href}>{domToReact(children, options)}</Link>;
          }
        }

        if (domNode.name === 'hr') {
          return <hr className="my-5" />;
        }
        if (domNode.name === 'ul') {
          return (
            <ul className="list-disc pl-6 [&>li]:mt-1">
              {domToReact(children, options)}
            </ul>
          );
        }

        if (domNode.name === 'li') {
          return <li>{domToReact(children, options)}</li>;
        }

        const isHeading = domNode.name.match(headingRegex);
        if (isHeading) {
          const headingLevel = Number(isHeading[1]);
          if (headingLevel === 1) {
            return (
              <h1 className="mt-10 mb-2 text-4xl" {...domNode.attribs}>
                {domToReact(children, options)}
              </h1>
            );
          }
          if (headingLevel === 2) {
            return (
              <h2 className="mt-6 mb-2 text-3xl" {...domNode.attribs}>
                {domToReact(children, options)}
              </h2>
            );
          }
          if (headingLevel === 3) {
            return (
              <h3 className="mt-3 mb-2 text-2xl" {...domNode.attribs}>
                {domToReact(children, options)}
              </h3>
            );
          }
          if (headingLevel === 4) {
            return (
              <h4 className="mt-1 mb-2 text-xl" {...domNode.attribs}>
                {domToReact(children, options)}
              </h4>
            );
          }
        }
        if (domNode.name === 'p') {
          return <p className="mt-1">{domToReact(children, options)}</p>;
        }
        if (domNode.name === 'table') {
          return (
            <table className="my-2 w-full">
              {domToReact(children, options)}
            </table>
          );
        }
        if (domNode.name === 'tr') {
          return (
            <tr className="m-0 border-t p-0 even:bg-muted">
              {domToReact(children, options)}
            </tr>
          );
        }
        if (domNode.name === 'th') {
          return (
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              {domToReact(children, options)}
            </th>
          );
        }
        if (domNode.name === 'td') {
          return (
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {domToReact(children, options)}
            </td>
          );
        }

        if (domNode.name === 'img') {
          // Add lazy loading to images
          return (
            <img
              {...domNode.attribs}
              loading="lazy"
              className="rounded-lg shadow-md"
            />
          );
        }
      }
    },
  };

  return <div className={className}>{parse(result.markup, options)}</div>;
}
