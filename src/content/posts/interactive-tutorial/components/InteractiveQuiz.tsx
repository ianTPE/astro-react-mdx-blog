import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Astro 的主要優勢是什麼？',
    options: [
      '只能建立靜態網站',
      '零 JavaScript 運行時（預設）',
      '只能使用 React',
      '不支援 SSR'
    ],
    correctAnswer: 1,
    explanation: 'Astro 預設會產生零 JavaScript 的靜態 HTML，這讓網站載入速度極快。只有在需要互動時才會載入 JavaScript。'
  },
  {
    id: 2,
    question: 'MDX 是什麼？',
    options: [
      '一種新的程式語言',
      'Markdown + JSX 的組合',
      '一個 CSS 框架',
      '一個資料庫'
    ],
    correctAnswer: 1,
    explanation: 'MDX 讓你可以在 Markdown 文件中使用 JSX 組件，完美結合了內容撰寫和動態組件。'
  },
  {
    id: 3,
    question: '本地組件架構的優勢是什麼？',
    options: [
      '所有組件都在同一個檔案裡',
      '每篇文章都有專屬的組件資料夾',
      '不能重複使用組件',
      '只能使用全域組件'
    ],
    correctAnswer: 1,
    explanation: '每篇文章都有專屬的組件資料夾，實現了完美的關注點分離和更好的組織結構。'
  },
  {
    id: 4,
    question: '如何在 MDX 中導入本地組件？',
    options: [
      'import { Component } from "global-components"',
      'import { Component } from "./components"',
      '<Component> 直接使用',
      '不需要導入'
    ],
    correctAnswer: 1,
    explanation: '使用相對路徑從同一資料夾的 components 目錄導入組件。'
  },
  {
    id: 5,
    question: 'Astro Islands 的概念是什麼？',
    options: [
      '整個頁面都是互動的',
      '只有特定組件在客戶端執行',
      '所有組件都是伺服器端渲染',
      '不支援任何互動'
    ],
    correctAnswer: 1,
    explanation: 'Astro Islands 讓你可以選擇性地讓特定組件在客戶端變為互動式，其他部分保持靜態。'
  }
];

export default function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(selectedAnswers[currentQuestion - 1] !== undefined);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setShowExplanation(false);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isCorrect = selectedAnswer === currentQ?.correctAnswer;

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
          </div>
          <h3 className="text-2xl font-bold mb-2">測驗完成！</h3>
          <div className="text-4xl font-bold mb-4">
            <span className={percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}>
              {score} / {questions.length}
            </span>
          </div>
          <div className="text-lg mb-6">
            {percentage >= 80 && <span className="text-green-600">🌟 優秀！你已經掌握了核心概念！</span>}
            {percentage >= 60 && percentage < 80 && <span className="text-yellow-600">👏 不錯！還可以再深入學習。</span>}
            {percentage < 60 && <span className="text-red-600">💪 繼續努力！建議重新閱讀相關內容。</span>}
          </div>

          {/* 詳細結果 */}
          <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-bold mb-3">答題詳情:</h4>
            {questions.map((q, index) => (
              <div key={q.id} className="mb-2 flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm mr-3 ${
                  selectedAnswers[index] === q.correctAnswer ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {selectedAnswers[index] === q.correctAnswer ? '✓' : '✗'}
                </div>
                <span className="text-sm">第 {index + 1} 題: {q.question}</span>
              </div>
            ))}
          </div>

          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            🔄 重新測驗
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
        <h3 className="text-xl font-bold mb-2">Astro MDX 知識測驗</h3>
        <div className="flex items-center justify-between">
          <span>第 {currentQuestion + 1} 題 / {questions.length} 題</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% 完成</span>
        </div>
        <div className="mt-2 w-full bg-white bg-opacity-30 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-lg font-bold mb-4">{currentQ.question}</h4>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? showExplanation
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : 'border-blue-500 bg-blue-50'
                  : showExplanation && index === currentQ.correctAnswer
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center text-sm font-bold ${
                  selectedAnswer === index
                    ? showExplanation
                      ? isCorrect
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-red-500 bg-red-500 text-white'
                      : 'border-blue-500 bg-blue-500 text-white'
                    : showExplanation && index === currentQ.correctAnswer
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && showExplanation
                    ? isCorrect ? '✓' : '✗'
                    : showExplanation && index === currentQ.correctAnswer
                    ? '✓'
                    : String.fromCharCode(65 + index)
                  }
                </div>
                {option}
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={`mt-4 p-4 rounded-lg ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex items-start">
              <span className="text-xl mr-2">
                {isCorrect ? '🎉' : '💡'}
              </span>
              <div>
                <h5 className={`font-bold mb-1 ${
                  isCorrect ? 'text-green-800' : 'text-yellow-800'
                }`}>
                  {isCorrect ? '答對了！' : '學習時刻'}
                </h5>
                <p className={`text-sm ${
                  isCorrect ? 'text-green-700' : 'text-yellow-700'
                }`}>
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ← 上一題
          </button>

          <button
            onClick={nextQuestion}
            disabled={selectedAnswer === undefined}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedAnswer === undefined
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {currentQuestion === questions.length - 1 ? '查看結果' : '下一題 →'}
          </button>
        </div>
      </div>
    </div>
  );
}
