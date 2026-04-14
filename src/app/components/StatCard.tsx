import React from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  valueColor: string;
  trend?: string;
}

export function StatCard({ label, value, valueColor, trend }: StatCardProps) {
  return (
    <div className="bg-muted dark:bg-[#1E2130] rounded-lg p-5 space-y-2 border border-transparent dark:border-[#2A2D3E]">
      <h4 className="text-muted-foreground dark:text-[#9CA3B8]">{label}</h4>
      <div className="text-3xl font-bold" style={{ color: valueColor }}>
        {value.toLocaleString()}
      </div>
      {trend && (
        <p className="text-muted-foreground dark:text-[#5C6480]" style={{ fontSize: 'var(--text-caption)' }}>
          {trend}
        </p>
      )}
    </div>
  );
}
