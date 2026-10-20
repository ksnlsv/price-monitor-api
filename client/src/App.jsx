import React, { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Stats from './components/Stats';
import ProductForm from './components/ProductForm';
import ProductFilters from './components/ProductFilters';
import ProductList from './components/ProductList';
import './App.css';

export default function App() {
  const [products, setProducts] = useLocalStorage('price_monitor_products', [
    { id: 1711000000001, title: 'Игровой ноутбук ASUS', category: 'Электроника', price: 85000, status: 'активен', createdAt: '20.03.2026, 12:00:00' },
    { id: 1711000000002, title: 'Кроссовки Nike Air Max', category: 'Одежда', price: 12500, status: 'на паузе', createdAt: '20.03.2026, 12:05:00' }
  ]);

  const [filters, setFilters] = useState({
    status: 'все',
    category: 'все',
    sortBy: 'dateDesc'
  });

  // Эффект 1: Изменение заголовка вкладки
  useEffect(() => {
    document.title = `Товаров (${products.length}) | Price Monitor`;
  }, [products.length]);

  // Эффект 2: Debounce-автосохранение (для отчета)
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(`[autosave] сохранено товаров: ${products.length}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [products]);

  // Операции
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateTitle = (id, newTitle) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, title: newTitle } : p));
  };

  const handleUpdateStatus = (id, newStatus) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  // Фильтрация и сортировка через useMemo
  const processedProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.status !== 'все' && product.status !== filters.status) return false;
      if (filters.category !== 'все' && product.category !== filters.category) return false;
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'dateDesc') return b.id - a.id;
      if (filters.sortBy === 'dateAsc') return a.id - b.id;
      if (filters.sortBy === 'title') return a.title.localeCompare(b.title);
      if (filters.sortBy === 'priceDesc') return b.price - a.price;
      if (filters.sortBy === 'priceAsc') return a.price - b.price;
      return 0;
    });
  }, [products, filters]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📉 Система мониторинга цен и скидок</h1>
        <p>Автоматизированный парсинг и контроль стоимости товаров</p>
      </header>

      <Stats products={products} />

      <div className="app-content">
        <div className="sidebar">
          <ProductForm onAddProduct={handleAddProduct} />
        </div>

        <div className="main-section">
          <ProductFilters filters={filters} setFilters={setFilters} />
          <ProductList 
            products={processedProducts} 
            onDelete={handleDeleteProduct}
            onUpdateTitle={handleUpdateTitle}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </div>
    </div>
  );
}