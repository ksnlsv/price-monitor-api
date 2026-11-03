import React, { useState } from 'react';
import { KpiCard } from '../components/KpiCard';
import { PriceChart } from '../components/PriceChart';
import { DiscountBadge } from '../components/DiscountBadge';
import { formatCurrency } from '../utils';
import { Package, Percent, Wallet, Store, ArrowUpDown, ExternalLink } from 'lucide-react';
import { priceHistoryData } from '../mockData';

export const DashboardView = ({ products, onOpenAddModal }) => {
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const totalPages = Math.ceil(products.length / pageSize) || 1;
  const paginated = products.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Dashboard</h1>
          <p className="text-xs text-neutral-500 mt-0.5">Обзор состояния мониторинга цен</p>
        </div>
        <button onClick={onOpenAddModal} className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3.5 py-2 rounded-lg text-xs font-medium">
          Добавить товар
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Всего товаров" value={products.length} change="+2 за неделю" icon={Package} trend="up" />
        <KpiCard title="Активных скидок" value={products.filter(p => p.discountPercent > 0).length} change="−4%" icon={Percent} trend="down" />
        <KpiCard title="Средняя экономия" value="14.2%" change="оптимально" icon={Wallet} trend="up" />
        <KpiCard title="Магазинов" value={3} change="Ozon, WB, ЯМ" icon={Store} trend="neutral" />
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5">
        <h2 className="text-sm font-semibold mb-1 text-neutral-900 dark:text-neutral-100">Динамика минимальной цены (30 дней)</h2>
        <PriceChart data={priceHistoryData} />
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Топ скидок</h2>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 uppercase font-medium border-b border-neutral-200 dark:border-neutral-800">
            <tr>
              <th className="px-4 py-3">Товар</th>
              <th className="px-4 py-3">Магазин</th>
              <th className="px-4 py-3">Цена</th>
              <th className="px-4 py-3">Скидка</th>
              <th className="px-4 py-3 text-right">Ссылка</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {paginated.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">{p.title}</td>
                <td className="px-4 py-3 text-neutral-500">{p.store}</td>
                <td className="px-4 py-3 font-mono font-semibold">{formatCurrency(p.currentPrice)}</td>
                <td className="px-4 py-3"><DiscountBadge percent={p.discountPercent} /></td>
                <td className="px-4 py-3 text-right">
                  <a href={p.url} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 inline-flex items-center gap-1">Открыть <ExternalLink className="w-3 h-3" /></a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};