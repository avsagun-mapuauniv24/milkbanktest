import React from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  gradient?: 'teal' | 'cyan' | 'purple';
}

export function StatCard({ label, value, icon, trend, gradient = 'teal' }: StatCardProps) {
  const gradientMap = {
    teal: 'from-teal-500/10 to-teal-600/5',
    cyan: 'from-cyan-500/10 to-blue-600/5',
    purple: 'from-purple-500/10 to-indigo-600/5',
  };

  const accentMap = {
    teal: 'text-teal-400',
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
  };

  const glowMap = {
    teal: 'shadow-teal-500/10',
    cyan: 'shadow-cyan-500/10',
    purple: 'shadow-purple-500/10',
  };

  return (
    <div className={`bg-gradient-to-br ${gradientMap[gradient]} border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm hover:border-slate-600/80 transition-all duration-300 group shadow-lg ${glowMap[gradient]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wide mb-2">{label}</p>
          <div className={`text-3xl font-bold ${accentMap[gradient]} transition-colors group-hover:brightness-110`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </div>
        {icon && (
          <div className={`p-3 rounded-lg bg-${gradient}-500/20 group-hover:bg-${gradient}-500/30 transition-colors`}>
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="pt-3 border-t border-slate-700/50">
          <p className="text-slate-400 text-xs">{trend}</p>
        </div>
      )}
    </div>
  );
}
