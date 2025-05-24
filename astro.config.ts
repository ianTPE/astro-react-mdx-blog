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
      syntaxHighlight: false, // 關閉內建，使用自定義組件
      remarkPlugins: [],
      rehypePlugins: [],
      // 配置 MDX 組件
      optimize: true,
    })
  ],
  markdown: {
    syntaxHighlight: false, // 讓 MDX 組件處理語法高亮
  }
});