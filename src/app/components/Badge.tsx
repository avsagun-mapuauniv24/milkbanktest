import React from 'react';

export type BadgeVariant = 'active' | 'pasteurized' | 'dispensed' | 'expired';

export interface BadgeProps {
  variant: BadgeVariant;
  children?: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full font-medium';

  const variantStyles = {
    active: 'bg-badge-active-bg text-badge-active',
    pasteurized: 'bg-badge-pasteurized-bg text-badge-pasteurized',
    dispensed: 'bg-badge-dispensed-bg text-badge-dispensed',
    expired: 'bg-badge-expired-bg text-badge-expired',
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
