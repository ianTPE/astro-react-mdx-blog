import { useState, useEffect } from 'react';

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface CustomChartProps {
  data: DataPoint[];
  title?: string;
  type?: 'bar' | 'pie';
}

export default function CustomChart({ 
  data, 
  title = "圖表", 
  type = 'bar' 
}: CustomChartProps) {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const maxValue = Math.max(...data.map(d => d.value));
  
  if (type === 'pie') {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let cumulativePercentage = 0;
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg width="192" height="192" className="transform -rotate-90">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${percentage} ${100 - percentage}`;
                const strokeDashoffset = -cumulativePercentage;
                cumulativePercentage += percentage;
                
                return (
                  <circle
                    key={index}
                    cx="96"
                    cy="96" 
                    r="80"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="16"
                    strokeDasharray={animated ? strokeDasharray : "0 100"}
                    strokeDashoffset={animated ? strokeDashoffset : 0}
                    className="transition-all duration-1000 ease-out"
                    style={{
                      transformOrigin: '96px 96px'
                    }}
                  />
                );
              })}
            </svg>
          </div>
          <div className="ml-6">
            {data.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <div 
                  className="w-4 h-4 rounded mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">
                  {item.label}: {item.value} ({((item.value / total) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-20 text-sm font-medium">{item.label}</div>
            <div className="flex-1 mx-3">
              <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                  style={{
                    backgroundColor: item.color,
                    width: animated ? `${(item.value / maxValue) * 100}%` : '0%'
                  }}
                >
                  <span className="text-white text-xs font-bold">
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
