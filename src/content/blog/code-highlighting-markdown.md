---
title: '代碼高亮示範 - 純 Markdown 版本'
description: '使用純 Markdown + Shiki 語法高亮 + 自定義複製按鈕'
author: 'Ian Chou'
publishDate: 2025-05-25
tags: ['Markdown', 'Syntax Highlighting', 'Shiki']
featured: true
category: '教學'
readingTime: 8
coverImage: '/images/blog/code-highlighting-cover.webp'
draft: false
---

# 代碼高亮示範 - 純 Markdown 版本

這篇文章展示了使用**純 Markdown** + **Shiki** + **自定義複製按鈕**的完美組合！

## 為什麼選擇純 Markdown？

- ✅ **更簡單** - 不需要複雜的 MDX 配置
- ✅ **更快** - 構建速度更快
- ✅ **更穩定** - 沒有 MDX 解析問題
- ✅ **更好維護** - 標準 Markdown 語法

## JavaScript 示例

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55

// 更進階的例子
class Calculator {
  constructor() {
    this.result = 0;
  }
  
  add(x) {
    this.result += x;
    return this;
  }
  
  multiply(x) {
    this.result *= x;
    return this;
  }
  
  getValue() {
    return this.result;
  }
}

const calc = new Calculator();
const result = calc.add(5).multiply(3).getValue(); // 15
```

## Python 示例

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

# 使用示例
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = quick_sort(numbers)
print(f"排序結果: {sorted_numbers}")

# 更複雜的例子
class DataProcessor:
    def __init__(self, data):
        self.data = data
    
    def filter_positive(self):
        return [x for x in self.data if x > 0]
    
    def calculate_average(self):
        return sum(self.data) / len(self.data) if self.data else 0

processor = DataProcessor([-2, 5, -1, 8, 3])
positive_data = processor.filter_positive()
average = processor.calculate_average()
```

## CSS 樣式

```css
.gradient-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.gradient-button:active {
  transform: translateY(0);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .gradient-button {
    padding: 10px 20px;
    font-size: 14px;
  }
}
```

## TypeScript 示例

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

class ApiClient {
  private baseUrl: string;
  private timeout: number;
  
  constructor(baseUrl: string, timeout = 5000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }
  
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        signal: controller.signal
      });
      
      const data = await response.json();
      
      return {
        data,
        status: response.status,
        message: response.ok ? 'Success' : 'Error',
        timestamp: new Date()
      };
    } catch (error) {
      throw new Error(`API call failed: ${error.message}`);
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

// 使用示例
const api = new ApiClient('https://api.example.com');
const users = await api.get<User[]>('/users');
```

## Bash 命令

```bash
#!/bin/bash

# 設置項目
echo "設置新的 Astro 項目..."
npm create astro@latest my-blog
cd my-blog

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 構建項目
echo "構建生產版本..."
npm run build

# 檢查構建結果
if [ -d "./dist" ]; then
    echo "✅ 構建成功！"
    echo "📁 輸出目錄: ./dist"
    du -sh ./dist
else
    echo "❌ 構建失敗"
    exit 1
fi
```

## JSON 配置

```json
{
  "name": "astro-blog",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.8.0",
    "@astrojs/react": "^4.3.0",
    "@astrojs/tailwind": "^5.1.2"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "@types/node": "^22.15.21"
  },
  "astro": {
    "syntaxHighlight": "shiki",
    "themes": ["github-dark", "github-light"],
    "languages": ["javascript", "typescript", "python", "bash", "json"]
  }
}
```

## 特色功能

### 🎨 語法高亮
- 使用 **Shiki** 內建引擎
- VS Code 原生主題
- 支援 100+ 程式語言

### 📋 複製按鈕
- 自動添加到所有代碼區塊
- 一鍵複製功能
- 成功/失敗提示

### 🏷️ 語言標籤
- 自動顯示程式語言
- 半透明設計
- 清晰易讀

### ⚡ 性能優勢
- 構建時生成語法高亮
- 沒有客戶端 JavaScript 負擔
- 更快的頁面載入

## 如何轉換到純 Markdown

如果你想從 MDX 轉換到純 Markdown：

1. **將文件副檔名改為 `.md`**
2. **移除所有 import 語句**
3. **移除自定義組件**
4. **保留所有標準 Markdown 語法**

### 轉換前 (MDX)
```text
import { CodeBlock } from '../../components/MDXComponents';

<CodeBlock language="javascript">
  console.log("Hello");
</CodeBlock>
```

### 轉換後 (Markdown)
```text
```javascript
console.log("Hello");
```
```

## 總結

純 Markdown + Shiki + 複製按鈕 = **完美的代碼高亮解決方案**！

- 🚀 **性能最佳**
- 🛠️ **維護最簡**
- 💎 **效果最美**
- 📱 **兼容最好**

你完全不需要 MDX 的複雜性，純 Markdown 就能滿足所有需求！🎉
