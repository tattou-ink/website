// content-collections.ts
import { z } from 'zod';
import { defineCollection, defineConfig } from '@content-collections/core';
import matter from 'gray-matter';

function extractFrontMatter(content: string) {
  const { data, content: body, excerpt } = matter(content, { excerpt: true });
  return { data, body, excerpt: excerpt || '' };
}

const staticPages = defineCollection({
  name: 'static',
  directory: './src/static',
  include: '*.md',
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),
    description: z.string().optional(),
    content: z.string(),
  }),
  transform: ({ content, ...post }) => {
    const frontMatter = extractFrontMatter(content);

    // Extract header image (first image in the document)
    const headerImageMatch = content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    const headerImage = headerImageMatch ? headerImageMatch[2] : undefined;

    return {
      ...post,
      slug: post._meta.path,
      excerpt: frontMatter.excerpt,
      description: frontMatter.data.description,
      headerImage,
      content: frontMatter.body,
    };
  },
});

export default defineConfig({ content: [staticPages] });
