// 作者數據和相關工具函數

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

// 作者數據
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

/**
 * 獲取作者信息
 */
export function getAuthor(name: string): Author | undefined {
  return authors[name];
}

/**
 * 格式化日期
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * 格式化閱讀時間
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} 分鐘閱讀`;
}

/**
 * 獲取所有作者
 */
export function getAllAuthors(): Author[] {
  return Object.values(authors);
}

/**
 * 檢查作者是否存在
 */
export function hasAuthor(name: string): boolean {
  return name in authors;
}