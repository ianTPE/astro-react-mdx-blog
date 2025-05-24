import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface AdvancedCodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  theme?: 'vsDark' | 'vsLight' | 'github' | 'dracula' | 'oceanicNext' | 'nightOwl';
  highlightLines?: number[];
  title?: string;
}

// 主題映射
const themeMap = {
  vsDark: themes.vsDark,
  vsLight: themes.vsLight,
  github: themes.github,
  dracula: themes.dracula,
  oceanicNext: themes.oceanicNext,
  nightOwl: themes.nightOwl,
};

export default function AdvancedCodeBlock({ 
  children, 
  language = 'javascript', 
  filename,
  title,
  showLineNumbers = false,
  theme = 'vsDark',
  highlightLines = []
}: AdvancedCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  // 確保 children 是字符串
  let codeText: string;
  if (typeof children === 'string') {
    codeText = children.trim();
  } else if (children && typeof children === 'object' && 'toString' in children) {
    codeText = String(children).trim();
  } else {
    codeText = String(children || '').trim();
  }
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const selectedTheme = themeMap[theme] || themes.vsDark;
  
  return (
    <div className="not-prose my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {(filename || title) && (
        <div className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-mono border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span>{title || filename}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              {language}
            </span>
            <button
              onClick={copyToClipboard}
              className="text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition-colors"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
        </div>
      )}
      
      <div className="relative">
        {!filename && !title && (
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded transition-colors z-10"
          >
            {copied ? '已複製!' : '複製'}
          </button>
        )}
        
        <Highlight
          theme={selectedTheme}
          code={codeText}
          language={language as any}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre 
              className={`${className} p-4 overflow-x-auto text-sm`}
              style={style}
            >
              <code>
                {tokens.map((line, lineIndex) => {
                  const lineNumber = lineIndex + 1;
                  const isHighlighted = highlightLines.includes(lineNumber);
                  
                  return (
                    <div 
                      key={lineIndex} 
                      {...getLineProps({ line })}
                      className={isHighlighted ? 'bg-yellow-200 dark:bg-yellow-900 bg-opacity-30' : ''}
                    >
                      {showLineNumbers && (
                        <span className="select-none pr-4 text-gray-500 text-right inline-block w-8 text-xs">
                          {lineNumber}
                        </span>
                      )}
                      {line.map((token, tokenIndex) => (
                        <span key={tokenIndex} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  );
                })}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}