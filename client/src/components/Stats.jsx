import React from 'react';

export default function Stats({ products }) {
  const total = products.length;
  const activeCount = products.filter(p => p.status === 'активен').length;
  const pausedCount = products.filter(p => p.status === 'на паузе').length;
  const avgPrice = total > 0 ? (products.reduce((acc, p) => acc + Number(p.price), 0) / total).toFixed(0) : 0;

  return (
    <div className="stats-panel">
      <div className="stat-item">
        <span className="stat-label">Всего позиций</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Активных парсеров</span>
        <span className="stat-value">{activeCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">На паузе</span>
        <span className="stat-value">{pausedCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Средняя цена</span>
        <span className="stat-value">{Number(avgPrice).toLocaleString()} ₽</span>
      </div>
    </div>
  );
}