import { defineCollection, z } from 'astro:content';

// 原有的 blog collection
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    category: z.string(),
    readingTime: z.number(),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 新的 posts collection - 支援巢狀結構
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    category: z.string(),
    readingTime: z.number(),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, posts };