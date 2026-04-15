import React from 'react';

export type BadgeVariant = 'active' | 'pasteurized' | 'dispensed' | 'expired';

export interface BadgeProps {
  variant: BadgeVariant;
  children?: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-colors';

  const variantStyles = {
    active: 'bg-gradient-to-r from-teal-500/20 to-teal-600/20 text-teal-300 border border-teal-500/30 hover:border-teal-500/50',
    pasteurized: 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50',
    dispensed: 'bg-gradient-to-r from-purple-500/20 to-indigo-600/20 text-purple-300 border border-purple-500/30 hover:border-purple-500/50',
    expired: 'bg-gradient-to-r from-red-500/20 to-orange-600/20 text-red-300 border border-red-500/30 hover:border-red-500/50',
  };

  const defaultLabels = {
    active: 'Active',
    pasteurized: 'Pasteurized',
    dispensed: 'Dispensed',
    expired: 'Expired',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]}`}>
      {children || defaultLabels[variant]}
    </span>
  );
}
