import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourdomain.com', // 請替換為你的實際域名
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(), 
    mdx({
      syntaxHighlight: 'shiki', // 使用內建的 Shiki 語法高亮
      remarkPlugins: [],
      rehypePlugins: [],
      // 配置 MDX 組件
      optimize: true,
    })
  ],
  markdown: {
    syntaxHighlight: 'shiki', // 確保 Markdown 也使用內建高亮
  }
});