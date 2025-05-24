# Prism React Renderer 使用指南

這個專案現在已經整合了 `prism-react-renderer`，讓你的代碼區塊更加美觀！

## 🎯 新功能

### 1. 自動語法高亮
所有使用 ```language 語法的代碼區塊都會自動應用語法高亮。

### 2. 兩種代碼區塊組件

#### CodeBlock (基本版)
```jsx
<CodeBlock 
  language="javascript" 
  filename="app.js"
  showLineNumbers={true}
  theme="dark" // 或 "light"
>
  你的代碼
</CodeBlock>
```

#### AdvancedCodeBlock (進階版)
```jsx
<AdvancedCodeBlock 
  language="javascript" 
  title="我的應用程式"
  theme="dracula" // vsDark, vsLight, github, dracula, oceanicNext, nightOwl
  showLineNumbers={true}
  highlightLines={[2, 5, 8]} // 高亮特定行
>
  你的代碼
</AdvancedCodeBlock>
```

## 🎨 支援的主題

- `vsDark` (預設) - VS Code 深色主題
- `vsLight` - VS Code 淺色主題
- `github` - GitHub 風格
- `dracula` - Dracula 主題
- `oceanicNext` - Oceanic Next 主題
- `nightOwl` - Night Owl 主題

## 📋 支援的語言

支援所有 Prism.js 的語言，包括但不限於：
- javascript, typescript
- python, java, c, cpp
- html, css, scss
- bash, shell
- json, yaml, xml
- react, jsx, tsx
- 等等...

## 🚀 在 MDX 中使用

### 方法 1: 標準 Markdown 語法
```markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```
```

### 方法 2: 使用組件
```markdown
import { CodeBlock } from '../../components/MDXComponents';

<CodeBlock language="javascript" filename="hello.js">
{`function hello() {
  console.log("Hello, World!");
}`}
</CodeBlock>
```

## ✨ 特色功能

- ✅ 語法高亮
- ✅ 一鍵複製代碼
- ✅ 行號顯示
- ✅ 多種主題
- ✅ 檔案名稱顯示
- ✅ 特定行高亮
- ✅ 終端機風格設計
- ✅ 響應式設計
- ✅ 深色/淺色模式支援

## 🛠️ 檔案結構

```
src/
├── components/
│   ├── blog/
│   │   ├── CodeBlock.tsx          # 基本代碼區塊
│   │   └── AdvancedCodeBlock.tsx  # 進階代碼區塊
│   └── MDXComponents.tsx          # MDX 組件映射
└── content/
    └── blog/
        └── code-highlighting-demo.mdx  # 示範文件
```

## 🎓 最佳實踐

1. **選擇合適的主題**：根據你的網站整體風格選擇主題
2. **適當使用行號**：對於教學內容建議開啟行號
3. **高亮重要程式碼**：使用 `highlightLines` 突出重點
4. **提供檔案名稱**：幫助讀者理解代碼上下文
5. **選擇正確的語言**：確保語法高亮效果最佳

現在開始享受美麗的代碼高亮功能吧！🎉