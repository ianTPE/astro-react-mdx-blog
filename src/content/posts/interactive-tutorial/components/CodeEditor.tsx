import { useState } from 'react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  title?: string;
}

export default function CodeEditor({ 
  initialCode = 'console.log("Hello, World!");', 
  language = 'javascript',
  title = '程式碼編輯器'
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('正在執行...');

    // 模擬代碼執行
    setTimeout(() => {
      try {
        // 這裡只是模擬執行，實際上不會執行用戶代碼
        if (code.includes('console.log')) {
          // 簡單解析 console.log 語句
          const logMatches = code.match(/console\.log\((.*?)\)/g);
          if (logMatches) {
            const results = logMatches.map(match => {
              const content = match.match(/console\.log\((.*?)\)/)?.[1] || '';
              // 移除引號
              return content.replace(/['"]/g, '');
            });
            setOutput(results.join('\n'));
          }
        } else if (code.includes('alert')) {
          setOutput('Alert 彈窗已顯示（模擬）');
        } else if (code.includes('function')) {
          setOutput('函數已定義（模擬）');
        } else {
          setOutput('代碼執行完成（模擬）');
        }
      } catch (error) {
        setOutput(`錯誤: ${error}`);
      }
      setIsRunning(false);
    }, 1000);
  };

  const clearOutput = () => {
    setOutput('');
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  const examples = [
    {
      name: 'Hello World',
      code: 'console.log("Hello, World!");'
    },
    {
      name: '變數定義',
      code: 'const name = "Astro";\nconst version = "5.0";\nconsole.log(`使用 ${name} ${version}`);'
    },
    {
      name: '函數定義',
      code: 'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("開發者"));'
    },
    {
      name: '陣列操作',
      code: 'const fruits = ["蘋果", "香蕉", "橘子"];\nfruits.forEach(fruit => {\n  console.log(`我喜歡 ${fruit}`);\n});'
    }
  ];

  const loadExample = (exampleCode: string) => {
    setCode(exampleCode);
    setOutput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <h3 className="font-bold flex items-center">
          <span className="text-yellow-400 mr-2">💻</span>
          {title}
        </h3>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* 示例代碼按鈕 */}
      <div className="bg-gray-100 p-3 border-b">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">示例:</span>
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => loadExample(example.code)}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition-colors"
            >
              {example.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* 代碼編輯區 */}
        <div className="border-r border-gray-200">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-700">
            編輯器 ({language})
          </div>
          <div className="p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 font-mono text-sm border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="在這裡輸入你的代碼..."
              spellCheck={false}
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={runCode}
                disabled={isRunning}
                className={`px-4 py-2 text-white font-medium rounded transition-colors ${
                  isRunning 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isRunning ? '執行中...' : '🚀 執行代碼'}
              </button>
              <button
                onClick={resetCode}
                className="px-4 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600 transition-colors"
              >
                重置
              </button>
            </div>
          </div>
        </div>

        {/* 輸出區 */}
        <div>
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-700 flex items-center justify-between">
            <span>輸出結果</span>
            <button
              onClick={clearOutput}
              className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            >
              清除
            </button>
          </div>
          <div className="p-4">
            <div className="h-64 bg-black text-green-400 font-mono text-sm p-3 rounded overflow-y-auto">
              {output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <span className="text-gray-500">點擊「執行代碼」查看結果...</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 說明文字 */}
      <div className="bg-blue-50 p-4 border-t border-blue-200">
        <div className="flex items-start">
          <span className="text-blue-500 mr-2">💡</span>
          <div className="text-sm text-blue-800">
            <strong>注意:</strong> 這是一個模擬的代碼編輯器，主要用於展示概念。
            實際執行功能是模擬的，主要解析 console.log 語句並顯示結果。
          </div>
        </div>
      </div>
    </div>
  );
}
