import { useState, useEffect } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  previousValue?: number;
  unit?: string;
  icon?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  animated?: boolean;
}

export default function StatCard({
  title,
  value,
  previousValue,
  unit = '',
  icon = '📊',
  color = 'blue',
  animated = true
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);
  
  useEffect(() => {
    if (!animated) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = value / steps;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setDisplayValue(Math.round(stepValue * currentStep));
      
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value, animated]);
  
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-100',
    green: 'bg-green-500 text-green-100',
    red: 'bg-red-500 text-red-100',
    yellow: 'bg-yellow-500 text-yellow-100',
    purple: 'bg-purple-500 text-purple-100'
  };
  
  const bgColorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    purple: 'bg-purple-50 border-purple-200'
  };
  
  const changePercentage = previousValue ? 
    ((value - previousValue) / previousValue * 100) : null;
    
  const isPositiveChange = changePercentage ? changePercentage > 0 : null;
  
  return (
    <div className={`p-6 rounded-lg border-2 ${bgColorClasses[color]} transition-all duration-300 hover:shadow-lg hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {animated ? displayValue.toLocaleString() : value.toLocaleString()}
            {unit && <span className="text-lg text-gray-600 ml-1">{unit}</span>}
          </p>
          
          {changePercentage !== null && (
            <div className="flex items-center mt-2">
              <span 
                className={`text-sm font-medium ${
                  isPositiveChange ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isPositiveChange ? '↗️' : '↘️'} 
                {Math.abs(changePercentage).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs 上期</span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
