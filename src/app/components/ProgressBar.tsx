import React from 'react';

export interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

export function ProgressBar({ label, value, max, color }: ProgressBarProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-foreground dark:text-white font-medium">{label}</span>
        <span className="text-muted-foreground dark:text-[#9CA3B8]">
          {value.toLocaleString()} / {max.toLocaleString()} mL
        </span>
      </div>
      <div className="w-full h-3 bg-muted dark:bg-[#2A2D3E] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: color
          }}
        ></div>
      </div>
    </div>
  );
}
