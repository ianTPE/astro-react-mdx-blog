import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // 由於我們使用 metadata.ts，所以不需要在這裡定義 schema
    // 但是我們仍然需要定義 collection 以避免自動生成警告
  }),
});

export const collections = { blog };