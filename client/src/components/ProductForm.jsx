import React, { useState } from 'react';

export default function ProductForm({ onAddProduct }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Электроника');
  const [price, setPrice] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    setIsParsing(true);

    // Имитация обращения к системе парсинга цен (задержка 1.5 секунды)
    setTimeout(() => {
      onAddProduct({
        id: Date.now(),
        title: title.trim(),
        category,
        price: Number(price),
        status: 'активен',
        createdAt: new Date().toLocaleString()
      });
      setTitle('');
      setPrice('');
      setIsParsing(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="test-form">
      <h3>🔍 Добавить товар для мониторинга</h3>
      <div className="form-group">
        <label>Название товара:</label>
        <input
          type="text"
          placeholder="Например: Видеокарта RTX 4070"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isParsing}
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Категория:</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            disabled={isParsing}
          >
            <option value="Электроника">Электроника</option>
            <option value="Одежда">Одежда</option>
            <option value="Дом и сад">Дом и сад</option>
            <option value="Продукты">Продукты</option>
          </select>
        </div>

        <div className="form-group">
          <label>Цена (₽):</label>
          <input
            type="number"
            min="1"
            placeholder="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={isParsing}
            required
          />
        </div>
      </div>

      <button type="submit" disabled={isParsing} className={isParsing ? 'loading' : ''}>
        {isParsing ? 'Парсинг цен...' : 'Запустить парсинг'}
      </button>
    </form>
  );
}