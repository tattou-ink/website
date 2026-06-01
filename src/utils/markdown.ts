// src/utils/markdown.ts
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import type { Root } from 'hast';

export type MarkdownHeading = { id: string; text: string; level: number };

export type MarkdownResult = { tree: Root; headings: Array<MarkdownHeading> };

export async function renderMarkdown(content: string): Promise<MarkdownResult> {
  const headings: Array<MarkdownHeading> = [];

  const processor = unified()
    .use(remarkBreaks) // Add line breaks when line ends with 2 spaces
    .use(remarkParse) // Parse markdown
    .use(remarkGfm) // Support GitHub Flavored Markdown
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST
    .use(rehypeRaw) // Process raw HTML in markdown
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['anchor'] },
    })
    .use(() => (tree) => {
      visit(tree, 'element', (node: any) => {
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
          headings.push({
            id: node.properties?.id || '',
            text: toString(node),
            level: parseInt(node.tagName.charAt(1), 10),
          });
        }
      });
    });

  const mdastTree = processor.parse(content);
  const hastTree = await processor.run(mdastTree);

  return { tree: hastTree, headings };
}
