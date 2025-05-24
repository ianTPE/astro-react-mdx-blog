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
    react(), // React 支援
    mdx({
      // 為本地組件架構的 MDX 配置
      syntaxHighlight: 'shiki',
      remarkPlugins: [],
      rehypePlugins: [],
      optimize: true,
    })
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      langs: [],
      wrap: true
    }
  }
});
