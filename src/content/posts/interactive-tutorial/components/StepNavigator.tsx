import { useState } from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  content: string;
  codeExample?: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: '設置專案',
    description: '創建新的 Astro 專案並安裝依賴',
    content: '首先，我們需要創建一個新的 Astro 專案。Astro 是一個現代的靜態網站生成器，專為速度而設計。',
    codeExample: 'npm create astro@latest my-project\ncd my-project\nnpm install'
  },
  {
    id: 2,
    title: '配置 MDX',
    description: '添加 MDX 支援以便使用 React 組件',
    content: 'MDX 讓我們可以在 Markdown 中使用 JSX 組件，這為內容創作提供了極大的靈活性。',
    codeExample: 'npm install @astrojs/mdx\n// astro.config.mjs\nexport default defineConfig({\n  integrations: [mdx()]\n});'
  },
  {
    id: 3,
    title: '創建組件',
    description: '在文章資料夾中創建專屬組件',
    content: '每個文章都可以有自己的組件資料夾，實現完美的關注點分離和可維護性。',
    codeExample: 'src/content/posts/my-post/\n├── content.mdx\n└── components/\n    ├── index.ts\n    └── CustomComponent.tsx'
  },
  {
    id: 4,
    title: '使用組件',
    description: '在 MDX 中導入並使用本地組件',
    content: '現在你可以在 MDX 文件中導入組件，創建豐富的交互式內容體驗。',
    codeExample: 'import { CustomComponent } from \'./components\';\n\n# 我的文章\n\n<CustomComponent prop="value" />'
  },
  {
    id: 5,
    title: '部署上線',
    description: '構建並部署你的網站',
    content: '完成開發後，使用 Astro 的構建命令生成靜態文件，然後部署到你喜歡的平台。',
    codeExample: 'npm run build\n# 靜態文件生成在 dist/ 資料夾\n# 可以部署到 Netlify、Vercel 或任何靜態主機'
  }
];

export default function StepNavigator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const getCurrentStepData = () => steps.find(step => step.id === currentStep) || steps[0];

  const nextStep = () => {
    if (currentStep < steps.length) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const markComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };

  const currentStepData = getCurrentStepData();
  const isLastStep = currentStep === steps.length;
  const isFirstStep = currentStep === 1;
  const isCurrentStepCompleted = completedSteps.includes(currentStep);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <h3 className="text-xl font-bold mb-2">交互式教學導航</h3>
        <p className="opacity-90">跟著步驟學習 Astro + MDX 本地組件架構</p>
      </div>

      {/* 進度條 */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            步驟 {currentStep} / {steps.length}
          </span>
          <span className="text-sm text-gray-600">
            已完成: {completedSteps.length} / {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 步驟列表 */}
      <div className="px-6 py-4 border-b">
        <div className="flex flex-wrap gap-2">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => goToStep(step.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                step.id === currentStep
                  ? 'bg-blue-500 text-white'
                  : completedSteps.includes(step.id)
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {completedSteps.includes(step.id) && '✓ '}
              {step.id}
            </button>
          ))}
        </div>
      </div>

      {/* 當前步驟內容 */}
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
            isCurrentStepCompleted ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {isCurrentStepCompleted ? '✓' : currentStep}
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">{currentStepData.title}</h4>
            <p className="text-sm text-gray-600">{currentStepData.description}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">{currentStepData.content}</p>
        </div>

        {currentStepData.codeExample && (
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
            <pre>{currentStepData.codeExample}</pre>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={isFirstStep}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isFirstStep
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ← 上一步
          </button>

          <div className="flex gap-2">
            {!isCurrentStepCompleted && (
              <button
                onClick={markComplete}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                標記完成 ✓
              </button>
            )}

            <button
              onClick={nextStep}
              disabled={isLastStep}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isLastStep
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isLastStep ? '完成' : '下一步 →'}
            </button>
          </div>
        </div>

        {isLastStep && completedSteps.length === steps.length && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-500 text-xl mr-2">🎉</span>
              <div>
                <h5 className="font-bold text-green-800">恭喜完成教學！</h5>
                <p className="text-green-700 text-sm">你已經掌握了 Astro MDX 本地組件架構的核心概念。</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
