import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md'
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg';
  
  const variants = {
    default: 'shadow-sm',
    bordered: 'border border-gray-200',
    elevated: 'shadow-lg'
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
}