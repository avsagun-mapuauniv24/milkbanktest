import React from 'react';

export interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color?: 'teal' | 'cyan' | 'purple';
}

export function ProgressBar({ label, value, max, color = 'teal' }: ProgressBarProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  const colorMap = {
    teal: 'bg-gradient-to-r from-teal-500 to-teal-400',
    cyan: 'bg-gradient-to-r from-cyan-500 to-blue-400',
    purple: 'bg-gradient-to-r from-purple-500 to-indigo-400',
  };

  const glowMap = {
    teal: 'shadow-lg shadow-teal-500/20',
    cyan: 'shadow-lg shadow-cyan-500/20',
    purple: 'shadow-lg shadow-purple-500/20',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-white font-semibold text-sm">{label}</span>
        <span className="text-slate-400 text-sm">
          {value.toLocaleString()} / {max.toLocaleString()} mL
        </span>
      </div>
      <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden border border-slate-700/30">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorMap[color]} ${glowMap[color]}`}
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        ></div>
      </div>
      <div className="text-right">
        <span className={`text-xs font-medium ${color === 'teal' ? 'text-teal-400' : color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}
