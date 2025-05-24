import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({ 
  children, 
  language = 'javascript', 
  filename,
  showLineNumbers = false 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const codeText = typeof children === 'string' ? children : String(children);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  const lines = codeText.trim().split('\n');
  
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
        
        <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto ${filename ? 'rounded-b-lg' : 'rounded-lg'}`}>
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              <div className="table w-full">
                {lines.map((line, index) => (
                  <div key={index} className="table-row">
                    <span className="table-cell text-gray-500 select-none pr-4 text-right w-8">
                      {index + 1}
                    </span>
                    <span className="table-cell">
                      {line || '\n'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              codeText
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}