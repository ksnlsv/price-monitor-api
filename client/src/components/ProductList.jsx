import React, { useState, useEffect } from 'react';
import '../ProductList.css';

export default function ProductList() {
  // 1. Состояние для массива товаров (пытаемся загрузить из localStorage при первом рендере)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('monitored_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Ошибка парсинга localStorage', e);
      }
    }
    // Моковые начальные данные под тему "Мониторинг цен"
    return [
      { id: 1, title: 'Видеокарта RTX 4070', price: 65000, category: 'Электроника' },
      { id: 2, title: 'Игровой монитор 27"', price: 32000, category: 'Электроника' },
      { id: 3, title: 'Эргономичное кресло', price: 21000, category: 'Мебель' }
    ];
  });

  // 2. Состояния для полей ввода (добавление нового товара)
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Электроника');

  // 3. Состояние для фильтрации по категории
  const [filterCategory, setFilterCategory] = useState('Все');

  // --- ЭФФЕКТЫ (Требования лабораторной) ---

  // Эффект 1: Сохранение в localStorage при каждом изменении products
  useEffect(() => {
    localStorage.setItem('monitored_products', JSON.stringify(products));
  }, [products]);

  // Эффект 2: Изменение заголовка страницы (document.title) в зависимости от количества товаров
  useEffect(() => {
    document.styleSheets; // фиктивный вызов, а заголовок меняем так:
    document.title = `Товаров на мониторинге: ${products.length}`;
  }, [products.length]);

  // --- ОБРАБОТЧИКИ СОБЫТИЙ ---

  // Добавление товара
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    const newProduct = {
      id: Date.now(), // уникальный ID на основе времени
      title: title.trim(),
      price: parseFloat(price),
      category: category
    };

    setProducts([newProduct, ...products]);
    setTitle('');
    setPrice('');
  };

  // Удаление товара
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(item => item.id !== id));
  };

  // Фильтрация товаров
  const filteredProducts = products.filter(item => {
    if (filterCategory === 'Все') return true;
    return item.category === filterCategory;
  });

  // Дополнительная статистика (по требованиям лабы)
  const totalPrice = products.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="product-container">
      <h2>🔍 Мониторинг цен и скидок</h2>

      {/* Статистика (Доп. эффект / требование) */}
      <div className="stats-card">
        <p>📦 Всего позиций: <strong>{products.length}</strong></p>
        <p>💰 Общая сумма цен: <strong>{totalPrice.toLocaleString()} ₽</strong></p>
      </div>

      {/* Форма добавления товара */}
      <form onSubmit={handleAddProduct} className="product-form">
        <h3>Добавить товар для отслеживания</h3>
        <input
          type="text"
          placeholder="Название товара (например, Ноутбук)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Цена (руб.)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Электроника">Электроника</option>
          <option value="Мебель">Мебель</option>
          <option value="Одежда">Одежда</option>
          <option value="Продукты">Продукты</option>
        </select>
        <button type="submit">Добавить в отслеживаемые</button>
      </form>

      {/* Фильтрация */}
      <div className="filter-block">
        <label>Фильтр по категории: </label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="Все">Все категории</option>
          <option value="Электроника">Электроника</option>
          <option value="Мебель">Мебель</option>
          <option value="Одежда">Одежда</option>
          <option value="Продукты">Продукты</option>
        </select>
      </div>

      {/* Список товаров */}
      <div className="list-section">
        <h3>Список товаров ({filteredProducts.length})</h3>
        {filteredProducts.length === 0 ? (
          <p className="empty-text">Список товаров пуст</p>
        ) : (
          <ul className="product-list">
            {filteredProducts.map(item => (
              <li key={item.id} className="product-item">
                <div className="item-info">
                  <span className="item-title">{item.title}</span>
                  <span className="item-category">[{item.category}]</span>
                </div>
                <div className="item-controls">
                  <span className="item-price">{item.price.toLocaleString()} ₽</span>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDeleteProduct(item.id)}
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}