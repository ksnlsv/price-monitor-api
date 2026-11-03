import React from 'react';
import { TrendingDown } from 'lucide-react';

export const DiscountBadge = ({ percent }) => {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
      <TrendingDown className="w-3 h-3" />
      −{percent}%
    </span>
  );
};