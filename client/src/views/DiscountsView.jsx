import React, { useState } from 'react';
import { DiscountBadge } from '../components/DiscountBadge';
import { formatCurrency } from '../utils';
import { ExternalLink, Flame } from 'lucide-react';

export const DiscountsView = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'Электроника', 'Бытовая техника'];

  const discounted = products.filter(p => p.discountPercent > 0).filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Скидки и акции</h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Мониторинг горящих дисконтов и таймеров снижения цен</p>
      </div>

      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === cat 
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' 
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {cat === 'all' ? 'Все категории' : cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {discounted.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-8 text-center text-xs text-neutral-400">
            Нет активных скидок в выбранной категории.
          </div>
        ) : (
          discounted.map(item => (
            <div key={item.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">{item.store || 'Ozon'}</span>
                  <DiscountBadge percent={item.discountPercent || 15} />
                </div>
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{item.title}</h3>
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 pt-1">
                  <span>Текущая: <strong className="text-neutral-900 dark:text-neutral-100">{formatCurrency(item.price)}</strong></span>
                  <span className="line-through">{formatCurrency(item.oldPrice || item.price * 1.25)}</span>
                </div>
              </div>

              <div className="w-full md:w-56 space-y-1.5">
                <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-rose-500" /> До конца акции</span>
                  <span>~14 ч 20 мин</span>
                </div>
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-neutral-900 dark:bg-neutral-100 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <a href={item.url && item.url.startsWith('http') ? item.url : '#'} target="_blank" rel="noreferrer" className="px-3 py-1.5 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1 transition-colors">
                  Перейти <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};