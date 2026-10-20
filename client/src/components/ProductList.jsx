import React, { useState } from 'react';

export default function ProductList({ products, onDelete, onUpdateTitle, onUpdateStatus }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleDoubleClick = (product) => {
    setEditingId(product.id);
    setEditText(product.title);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      if (editText.trim()) {
        onUpdateTitle(id, editText.trim());
      }
      setEditingId(null);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <div className="test-list-container">
      <h3>Отслеживаемые товары</h3>
      {products.length === 0 ? (
        <p className="empty-text">Список товаров пуст</p>
      ) : (
        <ul className="test-list">
          {products.map(product => (
            <li key={product.id} className={`test-item status-${product.status.replace(/\s+/g, '-')}`}>
              <div className="test-main-info">
                {editingId === product.id ? (
                  <input
                    type="text"
                    value={editText}
                    autoFocus
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, product.id)}
                    onBlur={() => setEditingId(null)}
                    className="edit-input"
                  />
                ) : (
                  <span 
                    className="test-topic" 
                    onDoubleClick={() => handleDoubleClick(product)}
                    title="Двойной клик для редактирования названия"
                  >
                    {product.title}
                  </span>
                )}
                <div className="test-meta">
                  <span className="badge difficulty">{product.category}</span>
                  <span className="badge questions"> {Number(product.price).toLocaleString()} ₽</span>
                  <span className="test-date">{product.createdAt}</span>
                </div>
              </div>

              <div className="test-actions">
                <select
                  value={product.status}
                  onChange={(e) => onUpdateStatus(product.id, e.target.value)}
                  className={`status-select ${product.status.replace(/\s+/g, '-')}`}
                >
                  <option value="активен">Активен</option>
                  <option value="на паузе">На паузе</option>
                  <option value="в архиве">В архиве</option>
                </select>

                <button 
                  className="delete-btn" 
                  onClick={() => onDelete(product.id)}
                  title="Удалить товар"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}