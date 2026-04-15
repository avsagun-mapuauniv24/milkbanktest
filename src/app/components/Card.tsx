import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  hover?: boolean;
}

export function Card({ children, className = '', gradient = false, hover = true }: CardProps) {
  return (
    <div
      className={`
        rounded-xl border border-slate-700/50 backdrop-blur-sm
        ${gradient ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50' : 'bg-slate-800/40'}
        ${hover ? 'hover:border-slate-600/80 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
