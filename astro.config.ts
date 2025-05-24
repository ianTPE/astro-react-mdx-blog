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
      syntaxHighlight: false, // 關閉內建的語法高亮，使用 prism-react-renderer
    })
  ]
});