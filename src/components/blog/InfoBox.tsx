import { type ReactNode } from 'react';

interface InfoBoxProps {
  children: ReactNode;
  type?: 'info' | 'warning' | 'success' | 'error' | 'tip';
  title?: string;
}

export default function InfoBox({ children, type = 'info', title }: InfoBoxProps) {
  const configs = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: '💡',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-800',
      textColor: 'text-blue-700'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: '⚠️',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-800',
      textColor: 'text-yellow-700'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '✅',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-800',
      textColor: 'text-green-700'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: '❌',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      titleColor: 'text-red-800',
      textColor: 'text-red-700'
    },
    tip: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: '💭',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      titleColor: 'text-purple-800',
      textColor: 'text-purple-700'
    }
  };
  
  const config = configs[type];
  
  return (
    <div className={`not-prose my-6 rounded-lg border ${config.bg} ${config.border} p-4`}>
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 w-6 h-6 rounded-full ${config.iconBg} flex items-center justify-center text-sm`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-semibold ${config.titleColor} mb-1`}>
              {title}
            </h4>
          )}
          <div className={`${config.textColor} prose prose-sm max-w-none`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}