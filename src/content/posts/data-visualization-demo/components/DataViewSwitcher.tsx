import { useState } from 'react';

interface DataViewProps {
  data: any[];
  onViewChange?: (view: string) => void;
}

export default function DataViewSwitcher({ data, onViewChange }: DataViewProps) {
  const [activeView, setActiveView] = useState('summary');
  const [showDetails, setShowDetails] = useState(false);
  
  const views = [
    { id: 'summary', label: '總覽', icon: '📊' },
    { id: 'detailed', label: '詳細', icon: '📋' },
    { id: 'chart', label: '圖表', icon: '📈' },
    { id: 'analysis', label: '分析', icon: '🔍' }
  ];
  
  const handleViewChange = (viewId: string) => {
    setActiveView(viewId);
    onViewChange?.(viewId);
  };
  
  const totalItems = data.length;
  const activeItems = data.filter(item => item.status === 'active').length;
  const averageValue = data.reduce((sum, item) => sum + (item.value || 0), 0) / totalItems;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">數據視圖控制面板</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {showDetails ? '隱藏詳情' : '顯示詳情'}
        </button>
      </div>
      
      {/* 視圖切換按鈕 */}
      <div className="flex gap-2 mb-4">
        {views.map(view => (
          <button
            key={view.id}
            onClick={() => handleViewChange(view.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeView === view.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {view.icon} {view.label}
          </button>
        ))}
      </div>
      
      {/* 當前視圖內容 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">
          當前視圖: {views.find(v => v.id === activeView)?.label}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
            <div className="text-sm text-gray-600">總項目數</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{activeItems}</div>
            <div className="text-sm text-gray-600">活躍項目</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {averageValue.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">平均值</div>
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-4 p-3 bg-white rounded border">
            <h5 className="font-medium mb-2">詳細資訊:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 活躍率: {((activeItems / totalItems) * 100).toFixed(1)}%</li>
              <li>• 最大值: {Math.max(...data.map(d => d.value || 0))}</li>
              <li>• 最小值: {Math.min(...data.map(d => d.value || 0))}</li>
              <li>• 數據更新時間: {new Date().toLocaleString('zh-TW')}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
