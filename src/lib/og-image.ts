// OG Image utility functions
import type { BlogPost } from './metadata';

export interface OGImageConfig {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Generate OG image URL for blog posts
 * Uses the post's cover image if available, otherwise falls back to default
 */
export function getPostOGImage(post: BlogPost): string {
  if (post.coverImage) {
    return post.coverImage;
  }
  return '/images/default-og-image.webp';
}

/**
 * Generate OG config for blog posts
 */
export function getPostOGConfig(post: BlogPost): OGImageConfig {
  return {
    title: `${post.title} | Ian's Blog`,
    description: post.description,
    image: getPostOGImage(post),
    type: 'article',
    publishedTime: post.publishDate.toISOString(),
    modifiedTime: post.updatedDate?.toISOString(),
    author: post.author,
    section: post.category,
    tags: post.tags
  };
}

/**
 * Generate OG config for general pages
 */
export function getPageOGConfig(
  title: string,
  description?: string,
  image?: string
): OGImageConfig {
  return {
    title: title === "Ian's Blog" ? title : `${title} | Ian's Blog`,
    description: description || "分享前端開發經驗、技術見解和個人成長的地方。專注於現代 Web 技術和最佳實踐。",
    image: image || '/images/default-og-image.webp',
    type: 'website'
  };
}

/**
 * Generate structured data for blog posts
 */
export function generateBlogPostStructuredData(post: BlogPost, canonicalURL: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": [getPostOGImage(post)],
    "datePublished": post.publishDate.toISOString(),
    "dateModified": (post.updatedDate || post.publishDate).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ian's Blog",
      "logo": {
        "@type": "ImageObject",
        "url": "/images/default-og-image.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalURL
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.readingTime * 200, // Approximate word count
    "timeRequired": `PT${post.readingTime}M`
  };
}

/**
 * Generate Twitter card meta tags
 */
export function getTwitterCardConfig(config: OGImageConfig) {
  const cardType = config.type === 'article' ? 'summary_large_image' : 'summary_large_image';
  
  return {
    card: cardType,
    title: config.title,
    description: config.description,
    image: config.image,
    creator: '@yourusername', // 更新為你的 Twitter 用戶名
    site: '@yourusername'     // 更新為你的 Twitter 用戶名
  };
}