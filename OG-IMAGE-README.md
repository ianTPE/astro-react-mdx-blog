# OG Image 功能說明

## 功能概述

這個 blog 網站現在具備完整的 Open Graph (OG) Image 功能，可以在社交媒體分享時顯示正確的預覽圖片和信息。

## 功能特點

### ✅ 自動 OG Image 選擇
- **博客文章**: 自動使用文章的封面圖片作為 OG image
- **其他頁面**: 使用默認的 OG image (`/images/default-og-image.webp`)

### ✅ 完整的 Meta Tags
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Article-specific tags (發布時間、作者、標籤等)
- 結構化數據 (JSON-LD)

### ✅ SEO 優化
- 動態標題和描述
- 正確的圖片尺寸信息
- 語言和地區設置

## 文件結構

```
src/
├── lib/
│   ├── metadata.ts          # 博客元數據
│   └── og-image.ts          # OG image 工具函數
├── layouts/
│   └── Layout.astro         # 主要布局，包含完整 meta tags
├── pages/
│   ├── index.astro          # 首頁
│   ├── og-test.astro        # OG 測試頁面
│   └── blog/
│       ├── index.astro      # 博客列表
│       └── [slug].astro     # 博客文章頁面
└── ...

public/
└── images/
    ├── default-og-image.webp # 默認 OG 圖片
    └── blog/
        ├── welcome-cover.webp
        ├── toolchain-cover.webp
        └── ...
```

## 使用方法

### 1. 為新博客文章添加 OG Image

在 `src/lib/metadata.ts` 中為新文章添加 `coverImage`:

```typescript
'new-article': {
  slug: 'new-article',
  title: '新文章標題',
  description: '文章描述...',
  // ... 其他元數據
  coverImage: '/images/blog/new-article-cover.webp', // 添加這行
  // ...
}
```

### 2. 圖片規格建議

- **尺寸**: 1200 x 630 像素 (OG 標準)
- **格式**: WebP (優先) 或 PNG/JPG
- **文件大小**: < 300KB
- **放置位置**: `public/images/blog/`

### 3. 測試 OG Images

訪問 `/og-test` 頁面來測試所有 OG images：
- 檢查圖片是否正常載入
- 使用社交媒體調試工具驗證

### 4. 社交媒體測試工具

- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/

## OG Image 工具函數

### `getPostOGImage(post: BlogPost): string`
為博客文章獲取 OG image URL。

### `getPostOGConfig(post: BlogPost): OGImageConfig`
為博客文章生成完整的 OG 配置。

### `getPageOGConfig(title, description?, image?): OGImageConfig`
為一般頁面生成 OG 配置。

### `generateBlogPostStructuredData(post, canonicalURL)`
生成博客文章的結構化數據。

## Layout 組件參數

```typescript
interface Props {
  title?: string;              // 頁面標題
  description?: string;        // 頁面描述
  image?: string;             // OG 圖片 URL
  type?: 'website' | 'article'; // OG 類型
  publishedTime?: string;      // 發布時間 (ISO 格式)
  modifiedTime?: string;       // 修改時間 (ISO 格式)
  author?: string;             // 作者
  section?: string;            // 文章分類
  tags?: string[];             // 標籤陣列
  structuredData?: object;     // 結構化數據
  noIndex?: boolean;           // 是否禁止索引
}
```

## 故障排除

### 圖片無法載入
1. 檢查圖片路徑是否正確
2. 確認圖片文件存在於 `public/images/` 目錄
3. 檢查圖片文件名和元數據中的路徑是否一致

### 社交媒體不顯示新圖片
1. 使用對應平台的調試工具刷新快取
2. 等待 24-48 小時讓快取自然過期
3. 確認圖片 URL 可以公開訪問

### Meta Tags 不正確
1. 檢查 `Layout.astro` 中的參數傳遞
2. 確認 OG 配置函數返回正確的值
3. 使用瀏覽器開發工具檢查 HTML 源碼

## 最佳實踐

1. **圖片優化**: 使用 WebP 格式減少文件大小
2. **一致性**: 保持所有 OG 圖片的視覺風格一致
3. **可讀性**: 確保圖片中的文字在小尺寸下仍然清晰
4. **品牌化**: 在圖片中包含網站 logo 或品牌元素
5. **測試**: 定期測試所有社交媒體平台的分享效果

## 更新默認 OG Image

要更換默認 OG 圖片：
1. 將新圖片放置在 `public/images/` 目錄
2. 更新 `src/lib/og-image.ts` 中的默認路徑
3. 重新部署網站

## 技術細節

- 支援 Open Graph 1.0 標準
- 包含 Twitter Card markup
- 提供完整的結構化數據
- 支援多語言 meta tags (zh-TW)
- 自動生成絕對 URL