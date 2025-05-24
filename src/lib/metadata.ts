// Blog metadata types and management
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishDate: Date;
  updatedDate?: Date;
  tags: string[];
  featured: boolean;
  category: string;
  readingTime: number; // minutes
  coverImage?: string;
  draft: boolean;
}

export interface Author {
  name: string;
  avatar?: string;
  bio: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

// Blog posts metadata
export const blogPosts: Record<string, BlogPost> = {
  'welcome': {
    slug: 'welcome',
    title: '歡迎來到我的博客',
    description: '這是我的第一篇博客文章，介紹這個博客的技術架構和我的寫作計劃。使用 Astro、React、TypeScript 和 Tailwind CSS 打造。',
    author: 'Ian Chou',
    publishDate: new Date('2024-05-24'),
    tags: ['Astro', 'React', 'TypeScript'],
    featured: true,
    category: '技術',
    readingTime: 5,
    coverImage: '/images/blog/welcome-cover.webp',
    draft: false
  },
  'modern-frontend-toolchain': {
    slug: 'modern-frontend-toolchain',
    title: '現代前端開發工具鏈',
    description: '探討現代前端開發中必備的工具鏈，包括建構工具、包管理器、開發環境配置等實用指南。',
    author: 'Ian Chou',
    publishDate: new Date('2024-05-25'),
    tags: ['Vite', 'ESBuild', '工具鏈'],
    featured: true,
    category: '教學',
    readingTime: 8,
    coverImage: '/images/blog/toolchain-cover.webp',
    draft: false
  },
  'welcome-to-my-blog': {
    slug: 'welcome-to-my-blog',
    title: '歡迎來到我的 Blog！',
    description: '這是我使用 Astro + React + MDX + TypeScript 建立的第一篇博客文章，展示了各種組件的使用方式。',
    author: 'Ian Chou',
    publishDate: new Date('2025-01-20'),
    tags: ['Astro', 'React', 'MDX', 'TypeScript', 'TailwindCSS'],
    featured: false,
    category: 'Tech',
    readingTime: 5,
    coverImage: '/images/blog/welcome-to-my-blog.webp',
    draft: false
  }
};

// Authors metadata
export const authors: Record<string, Author> = {
  'Ian Chou': {
    name: 'Ian Chou',
    avatar: '/images/authors/ian.webp',
    bio: '熱愛前端開發的工程師，專精於 React、TypeScript 和現代 Web 技術。',
    social: {
      github: 'https://github.com/yourusername',
      twitter: 'https://twitter.com/yourusername',
      website: 'https://yourwebsite.com'
    }
  }
};

// Utility functions
export function getPostMetadata(slug: string): BlogPost | undefined {
  return blogPosts[slug];
}

export function getAllPosts(): BlogPost[] {
  return Object.values(blogPosts)
    .filter(post => !post.draft)
    .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter(post => post.featured);
}

export function getAuthor(name: string): Author | undefined {
  return authors[name];
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} 分鐘閱讀`;
}