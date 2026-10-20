import React from 'react';

export default function Stats({ products }) {
  const total = products.length;
  const activeCount = products.filter(p => p.status === 'активен').length;
  const pausedCount = products.filter(p => p.status === 'на паузе').length;
  const avgPrice = total > 0 ? (products.reduce((acc, p) => acc + Number(p.price), 0) / total).toFixed(0) : 0;

  return (
    <div className="stats-panel">
      <div className="stat-item"> Всего товаров: <strong>{total}</strong></div>
      <div className="stat-item"> Активных: <strong>{activeCount}</strong></div>
      <div className="stat-item"> На паузе: <strong>{pausedCount}</strong></div>
      <div className="stat-item"> Средняя цена: <strong>{Number(avgPrice).toLocaleString()} ₽</strong></div>
    </div>
  );
}