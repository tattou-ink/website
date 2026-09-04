// content-collections.ts
import { z } from 'zod';
import { defineCollection, defineConfig } from '@content-collections/core';
import matter from 'gray-matter';

function extractFrontMatter(content: string) {
  const { data, content: body } = matter(content);
  return { data, body };
}

const staticPages = defineCollection({
  name: 'static',
  directory: './src/static',
  include: '**/*.md',
  exclude: ['blog/**'],
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),
    description: z.string().optional(),
    content: z.string(),
  }),
  transform: ({ content, ...post }) => {
    const frontMatter = extractFrontMatter(content);

    return {
      ...post,
      slug: post._meta.path,
      description: frontMatter.data.description,
      content: frontMatter.body,
    };
  },
});

const blogPosts = defineCollection({
  name: 'blogPosts',
  directory: './src/static/blog',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),
    description: z.string(),
    category: z.string(),
    heroImage: z.string(),
    cta: z.object({
      type: z.enum(['app', 'homepage']),
      anchor: z.string().optional(),
      label: z.string(),
    }),
    relatedArticles: z.array(z.string()).optional(),
    content: z.string(),
  }),
  transform: ({ content, ...post }) => {
    const frontMatter = extractFrontMatter(content);

    return {
      ...post,
      slug: `blog/${post._meta.path}`,
      description: frontMatter.data.description,
      content: frontMatter.body,
    };
  },
});

export default defineConfig({ content: [staticPages, blogPosts] });
