import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';

interface EligibilityBadgeProps {
  status: 'LIKELY ELIGIBLE' | 'POTENTIALLY ELIGIBLE' | 'LIKELY NOT ELIGIBLE' | 'INSUFFICIENT INFORMATION' | string;
  size?: 'sm' | 'md' | 'lg';
}

export const EligibilityBadge: React.FC<EligibilityBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toUpperCase();

  let bgColor = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300';
  let icon = <HelpCircle className="w-4 h-4" />;
  let label = status;

  if (normalized.includes('LIKELY ELIGIBLE') && !normalized.includes('NOT')) {
    bgColor = 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    label = 'Likely Eligible';
  } else if (normalized.includes('POTENTIALLY')) {
    bgColor = 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    icon = <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    label = 'Potentially Eligible';
  } else if (normalized.includes('NOT ELIGIBLE')) {
    bgColor = 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    icon = <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
    label = 'Likely Not Eligible';
  } else {
    bgColor = 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800';
    icon = <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
    label = 'Need Information';
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium border shadow-xs ${bgColor} ${sizeClasses[size]}`}>
      {icon}
      <span>{label}</span>
    </span>
  );
};
