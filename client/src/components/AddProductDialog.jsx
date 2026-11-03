import React, { useState } from 'react';
import { X, Link as LinkIcon, Image as ImageIcon, Tag, Loader2 } from 'lucide-react';

export const AddProductDialog = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');     // <-- Новое состояние для названия
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');     // <-- Новое состояние для цены (опционально)
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const stores = ['Ozon', 'Wildberries', 'Яндекс Маркет'];
      
      const newProduct = {
        title: title.trim(), // Используем то, что ввела пользовательница
        store: stores[Math.floor(Math.random() * stores.length)],
        url: url.trim(),
        image: image.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80',
        price: price ? Number(price) : (Math.floor(Math.random() * 30000) + 4000),
        oldPrice: price ? Math.round(Number(price) * 1.25) : 50000,
        discountPercent: Math.floor(Math.random() * 25) + 5,
        category: 'Электроника',
        status: 'активен'
      };

      onAdd(newProduct);
      setLoading(false);
      setTitle('');
      setUrl('');
      setImage('');
      setPrice('');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold mb-1 text-neutral-900 dark:text-neutral-100">Добавить товар</h2>
        <p className="text-xs text-neutral-500 mb-5">Укажите название, ссылку и параметры отслеживания для парсера.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Название товара */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">Название товара</label>
            <div className="relative flex items-center">
              <Tag className="absolute left-3 w-4 h-4 text-neutral-400" />
              <input 
                type="text" 
                required
                placeholder="Например: Смартфон Apple iPhone 15"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none"
              />
            </div>
          </div>

          {/* URL товара */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">URL товара (ссылка на магазин)</label>
            <div className="relative flex items-center">
              <LinkIcon className="absolute left-3 w-4 h-4 text-neutral-400" />
              <input 
                type="url" 
                required
                placeholder="https://ozon.ru/product/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none font-mono text-xs"
              />
            </div>
          </div>

          {/* Цена (опционально) */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">Цена (в рублях, не обязательно)</label>
            <input 
              type="number" 
              placeholder="Например: 49990"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none font-mono text-xs"
            />
          </div>

          {/* URL картинки */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">URL картинки (необязательно)</label>
            <div className="relative flex items-center">
              <ImageIcon className="absolute left-3 w-4 h-4 text-neutral-400" />
              <input 
                type="url" 
                placeholder="https://site.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">Отмена</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 flex items-center gap-2 hover:opacity-90">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Сохранение...' : 'Добавить товар'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};