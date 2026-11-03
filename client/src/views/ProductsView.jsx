import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { PackageOpen, Filter } from 'lucide-react';

export const ProductsView = ({ products, onDelete, onUpdate, onSelectForStats, onOpenAddModal}) => {
  const [selectedStore, setSelectedStore] = useState('all');
  const [onlyDiscount, setOnlyDiscount] = useState(false);

  const filtered = products.filter(p => {
    if (selectedStore !== 'all' && p.store !== selectedStore) return false;
    if (onlyDiscount && p.discountPercent <= 0) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Товары</h1>
          <p className="text-xs text-neutral-500">Управление отслеживаемыми позициями в базе данных</p>
        </div>
        <button onClick={onOpenAddModal} className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3.5 py-2 rounded-lg text-xs font-medium">Добавить товар</button>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 flex items-center gap-4">
        <Filter className="w-4 h-4 text-neutral-400" />
        <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} className="bg-neutral-100 dark:bg-neutral-800 border-0 rounded-lg px-3 py-1.5 text-xs">
          <option value="all">Все магазины</option>
          <option value="Ozon">Ozon</option>
          <option value="Wildberries">Wildberries</option>
          <option value="Яндекс Маркет">Яндекс Маркет</option>
        </select>
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <input type="checkbox" checked={onlyDiscount} onChange={(e) => setOnlyDiscount(e.target.checked)} />
          <span>Только со скидкой</span>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-12 text-center flex flex-col items-center">
          <PackageOpen className="w-10 h-10 text-neutral-400 mb-3" />
          <h3 className="text-sm font-semibold mb-1">Список товаров пуст</h3>
          <p className="text-xs text-neutral-500 mb-4">Добавьте первый товар для мониторинга цен.</p>
          <button onClick={onOpenAddModal} className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3 py-1.5 rounded-lg text-xs font-medium">Добавить товар</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onUpdate={onUpdate}
              onDelete={onDelete} 
              onSelectForStats={onSelectForStats} 
            />
          ))}
        </div>
      )}
    </div>
  );
};