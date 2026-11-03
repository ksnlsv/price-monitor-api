import React from 'react';
import { X, ExternalLink, Calendar, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { PriceChart } from './PriceChart';
import { formatCurrency } from '../utils';

export const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  // Генерируем уникальную, но стабильную фейковую историю цен для этого конкретного товара
  const getUniquePriceHistory = (prod) => {
    const storageKey = `price_history_${prod.id}`;
    const savedHistory = localStorage.getItem(storageKey);
    
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch (e) {
        console.error(e);
      }
    }

    const basePrice = Number(prod.price) || 50000;
    const days = ['10 дней назад', '7 дней назад', '5 дней назад', '3 дня назад', 'Вчера', 'Сегодня'];
    
    let current = Math.round(basePrice * (0.85 + Math.random() * 0.3));
    
    const history = days.map((day, index) => {
      if (index === days.length - 1) {
        current = basePrice;
      } else {
        const fluctuation = (Math.random() - 0.45) * 0.15;
        current = Math.round(current * (1 + fluctuation));
      }
      return { date: day, minPrice: current };
    });

    localStorage.setItem(storageKey, JSON.stringify(history));
    return history;
  };

  const chartData = getUniquePriceHistory(product);
  
  const firstPrice = chartData[0]?.minPrice || product.price;
  const lastPrice = chartData[chartData.length - 1]?.minPrice || product.price;
  const diffPercent = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(1);
  const isUp = diffPercent > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      {/* Уменьшили максимальную ширину до max-w-xl и добавили max-h с внутренним скроллом */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl w-full max-w-xl p-5 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Кнопка закрытия (теперь внутри потока шапки, никуда не улетит) */}
        <div className="flex items-start justify-between pb-3 mb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
              {product.store || 'Ozon'}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              {product.category || 'Электроника'}
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Шапка товара (компактная) */}
        <div className="flex items-center gap-3.5 mb-4">
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80'} 
            alt={product.title} 
            className="w-14 h-14 rounded-lg object-cover border border-neutral-200 dark:border-neutral-800 bg-neutral-100 shrink-0"
          />
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2">
            {product.title}
          </h2>
        </div>

        {/* Метрики товара (компактный грид) */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
            <span className="text-[11px] text-neutral-500 block mb-0.5">Текущая цена</span>
            <span className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
              {formatCurrency(product.price)}
            </span>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
            <span className="text-[11px] text-neutral-500 block mb-0.5">Тренд за 10 дн.</span>
            <div className={`flex items-center gap-1 text-sm font-bold font-mono mt-0.5 ${isUp ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isUp ? `+${diffPercent}%` : `${diffPercent}%`}
            </div>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
            <span className="text-[11px] text-neutral-500 block mb-0.5">Парсер</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Активен
            </span>
          </div>
        </div>

        {/* График */}
        <div className="bg-neutral-50/50 dark:bg-neutral-800/30 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 mb-4">
          <h3 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-500" /> Динамика цены
          </h3>
          <PriceChart data={chartData} />
        </div>

        {/* Низ модалки */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-[11px] text-neutral-400 font-mono">
            ID: {product.id}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Закрыть
            </button>
            
            <a 
              href={product.url && product.url.startsWith('http') ? product.url : '#'} 
              target="_blank" 
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 flex items-center gap-1 transition-opacity"
            >
              В магазин <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};