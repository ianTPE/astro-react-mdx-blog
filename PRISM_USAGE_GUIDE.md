# Prism React Renderer 使用指南 - 已修復！

這個專案現在已經成功整合了 `prism-react-renderer`，讓你的代碼區塊更加美觀！🎉

## ✅ 已修復的問題

經過調試和優化，我們已經解決了代碼高亮的問題：
- **標準 Markdown 代碼塊** ✅ 完美工作
- **預定義組件演示** ✅ 完美工作
- **自定義組件映射** ✅ 自動處理

## 🎯 推薦使用方法

### 1. 標準 Markdown 語法（最佳選擇）

這是最簡單、最可靠的方法：

```markdown
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

```python
def hello_world():
    print("Hello, World!")
```

```css
.button {
  background: linear-gradient(45deg, #007acc, #005a9e);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
```
```

### 2. 預定義演示組件

對於複雜的代碼演示，創建專門的組件：

```tsx
// src/components/blog/demos/MyDemo.tsx
import CodeBlock from '../CodeBlock';

export default function MyDemo() {
  const code = `你的代碼內容`;
  
  return (
    <CodeBlock 
      language="typescript" 
      filename="example.ts"
      showLineNumbers={true}
    >
      {code}
    </CodeBlock>
  );
}
```

然後在 MDX 中使用：
```markdown
import MyDemo from '../../components/blog/demos/MyDemo';

<MyDemo />
```

## 🎨 支援的功能

### 基本代碼區塊
- ✅ 自動語法高亮
- ✅ 複製按鈕
- ✅ 行號顯示
- ✅ 檔案名顯示

### 進階代碼區塊
- ✅ 多種主題：vsDark, vsLight, github, dracula, oceanicNext, nightOwl
- ✅ 行高亮功能
- ✅ 終端機風格設計
- ✅ 響應式設計

## 🎨 支援的主題

- `vsDark` (預設) - VS Code 深色主題
- `vsLight` - VS Code 淺色主題
- `github` - GitHub 風格
- `dracula` - Dracula 主題
- `oceanicNext` - Oceanic Next 主題
- `nightOwl` - Night Owl 主題

## 📋 支援的語言

支援所有 Prism.js 的語言，包括：
- JavaScript, TypeScript
- Python, Java, C, C++
- HTML, CSS, SCSS
- Bash, Shell
- JSON, YAML, XML
- React, JSX, TSX
- 等等...

## 🚀 在 MDX 中使用

### 推薦方式：標準 Markdown

```markdown
---
title: '我的文章'
---

# 代碼示例

這是 JavaScript 代碼：

```javascript
function hello() {
  console.log("Hello, World!");
}
```

這是 Python 代碼：

```python
def greet(name):
    return f"Hello, {name}!"
```
```

### 高級功能：自定義組件

```markdown
---
title: '進階示例'
---

import { CodeBlock, AdvancedCodeBlock } from '../../components/MDXComponents';
import MyCustomDemo from '../../components/blog/demos/MyCustomDemo';

# 進階代碼高亮

<MyCustomDemo />
```

## ✨ 特色功能

- ✅ **語法高亮** - 美麗的代碼配色
- ✅ **一鍵複製** - 方便複製代碼
- ✅ **行號顯示** - 可選擇顯示行號
- ✅ **多種主題** - 支援多種配色主題
- ✅ **檔案名稱** - 可顯示檔案名和語言標籤
- ✅ **行高亮** - 可高亮特定行數
- ✅ **終端機風格** - 仿 macOS 的美觀設計
- ✅ **響應式設計** - 完美適配各種設備
- ✅ **深色模式支援** - 自動適應深色主題

## 🛠️ 檔案結構

```
src/
├── components/
│   ├── blog/
│   │   ├── CodeBlock.tsx          # 基本代碼區塊
│   │   ├── AdvancedCodeBlock.tsx  # 進階代碼區塊
│   │   └── demos/                 # 預定義演示組件
│   │       ├── TypeScriptDemo.tsx
│   │       ├── ReactHookDemo.tsx
│   │       ├── BashDemo.tsx
│   │       └── JsonDemo.tsx
│   └── MDXComponents.tsx          # MDX 組件映射
└── content/
    └── blog/
        └── code-highlighting-demo.mdx  # 示範文件
```

## 🎓 最佳實踐

1. **優先使用標準 Markdown 語法** - 最簡單最可靠
2. **為複雜演示創建專門組件** - 更好的可維護性
3. **選擇合適的主題** - 根據文章風格選擇
4. **適當使用行號** - 對於教學內容建議開啟
5. **高亮重要程式碼** - 使用 `highlightLines` 突出重點
6. **提供檔案名稱** - 幫助讀者理解代碼上下文
7. **選擇正確的語言** - 確保語法高亮效果最佳

## 🐛 已知問題

- ❌ 在 MDX 中直接使用模板字符串傳遞代碼內容可能有問題
- ✅ 解決方案：使用標準 Markdown 語法或預定義組件

## 📚 示例文章

查看 `code-highlighting-demo.mdx` 文件可以看到所有功能的完整示範！

現在開始享受美麗的代碼高亮功能吧！🎉