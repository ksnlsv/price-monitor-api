import React from 'react';

export const KpiCard = ({ title, value, change, icon: Icon, trend }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
        <span className="text-xs font-medium uppercase tracking-wider">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />}
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <div className="text-2xl font-semibold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
          {value}
        </div>
        {change && (
          <span className={`text-xs font-mono font-medium px-1.5 py-0.5 rounded ${
            trend === 'up' 
              ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400' 
              : 'text-neutral-600 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300'
          }`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};