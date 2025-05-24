import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  theme?: 'dark' | 'light';
}

export default function CodeBlock({ 
  children, 
  language = 'javascript', 
  filename,
  showLineNumbers = false,
  theme = 'dark'
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const codeText = typeof children === 'string' ? children.trim() : String(children).trim();
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // 選擇主題
  const selectedTheme = theme === 'dark' ? themes.vsDark : themes.vsLight;
  
  return (
    <div className="not-prose my-6">
      {filename && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono border-b border-gray-700 rounded-t-lg flex items-center justify-between">
          <span>{filename}</span>
          <span className="text-xs bg-gray-700 px-2 py-1 rounded">{language}</span>
        </div>
      )}
      
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded transition-colors z-10"
        >
          {copied ? '已複製!' : '複製'}
        </button>
        
        <Highlight
          theme={selectedTheme}
          code={codeText}
          language={language as any}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre 
              className={`${className} p-4 overflow-x-auto ${filename ? 'rounded-b-lg' : 'rounded-lg'}`}
              style={style}
            >
              <code>
                {tokens.map((line, lineIndex) => (
                  <div key={lineIndex} {...getLineProps({ line })}>
                    {showLineNumbers && (
                      <span className="select-none pr-4 text-gray-500 text-right inline-block w-8">
                        {lineIndex + 1}
                      </span>
                    )}
                    {line.map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}