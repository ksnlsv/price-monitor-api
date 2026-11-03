import React, { useState } from 'react';
import { DiscountBadge } from './DiscountBadge';
import { formatCurrency } from '../utils';
import { ExternalLink, Check, Plus, Trash2, BarChart2 } from 'lucide-react';

export const ProductCard = ({ product, onDelete, onSelectForStats }) => {

  const [isTracking, setIsTracking] = useState(product.status === 'активен');

  const handleToggleTrack = (e) => {
    e.stopPropagation();
    const nextState = !isTracking;
    setIsTracking(nextState); // Мгновенно меняем состояние кнопки в UI
    
    // Если бэкенд поддерживает обновление, отправляем запрос тихо в фоне
    if (onUpdate) {
      onUpdate(product.id, { status: nextState ? 'активен' : 'на паузе' });
    }
  };

  return (
    <div 
      onClick={() => onSelectForStats && onSelectForStats(product)}
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 flex flex-col justify-between group cursor-pointer shadow-sm hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-xs font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
            {product.store || 'Ozon'}
          </span>
          <div className="flex items-center gap-1.5">
            <DiscountBadge percent={product.discountPercent || 15} />
            {onDelete && (
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
                className="text-neutral-400 hover:text-rose-600 transition-colors p-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/30"
                title="Удалить товар"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Картинка и плашка «Статистика цены» */}
        <div className="w-full h-36 bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-3 overflow-hidden flex items-center justify-center relative">
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80'} 
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[2px]">
            <BarChart2 className="w-4 h-4" /> Статистика цены
          </div>
        </div>

        {/* Название товара */}
        <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {product.title}
        </h3>
      </div>

      <div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold font-mono text-neutral-900 dark:text-neutral-100">
            {formatCurrency(product.price)}
          </span>
          <span className="text-xs font-mono text-neutral-400 line-through">
            {formatCurrency(product.oldPrice || product.price * 1.25)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <a 
            href={product.url && product.url.startsWith('http') ? product.url : '#'} 
            target="_blank" 
            rel="noreferrer" 
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1"
          >
            Источник <ExternalLink className="w-3 h-3" />
          </a>
          
          <button
            onClick={handleToggleTrack}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isTracking 
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900' 
                : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 hover:bg-neutral-200'
            }`}
          >
            {isTracking ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {isTracking ? 'Отслеживается' : 'Следить'}
          </button>
        </div>
      </div>
    </div>
  );
};