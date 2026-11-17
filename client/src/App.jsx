import React, { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import { Layout } from './components/Layout';
import { AddProductDialog } from './components/AddProductDialog';
import { DashboardView } from './views/DashboardView';
import { ProductsView } from './views/ProductsView';
import { DiscountsView } from './views/DiscountsView';
import { NotificationsView } from './views/NotificationsView';
import { SettingsView } from './views/SettingsView';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './api';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  

  useEffect(() => {
    const existingToken = localStorage.getItem('token');
    if (!existingToken) {
      const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ0ZXN0dXNlckBtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzkzNjQxMDAwLCJleHAiOjE3OTM2NDQ2MDB9.Xqofu3UlRVDkl2S5TvJLTYu2OCjIlpk-ykAV4ujkylA'; 
      localStorage.setItem('token', testToken);
    }
  }, []);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Система инициализирована', description: 'Подключение к REST API успешно установлено', time: 'Только что', read: false }
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Загрузка товаров с сервера (GET) с обработкой ошибок
  const loadProducts = useCallback(async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProducts(query);
      const rawData = Array.isArray(response) ? response : (response.products || response.data || []);

      const formatted = rawData.map(item => {
        const rawPrice = item.price ?? item.cost ?? 0;
        const parsedPrice = Number(rawPrice);
        const validPrice = !isNaN(parsedPrice) ? parsedPrice : 0;

        return {
          ...item,
          id: item.id || Math.random(),
          title: item.title || item.name || 'Без названия',
          price: validPrice,
          currentPrice: validPrice, // нужно для карточек
          oldPrice: item.oldPrice || Math.round(validPrice * 1.25),
          discountPercent: item.discountPercent || 15,
          store: item.store || 'Ozon',
          category: item.category || 'Электроника',
          status: item.status || 'активен'
        };
      });
      setProducts(formatted);
    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
      setError('Не удалось загрузить данные с сервера. Проверьте соединение.');
    } finally {
      setLoading(false);
    }
  }, []);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
  const handleOpen = () => setIsAuthModalOpen(true);
    window.addEventListener('open-auth-modal', handleOpen);
    return () => window.removeEventListener('open-auth-modal', handleOpen);
  }, []);

 
  useEffect(() => {
    const handler = setTimeout(() => {
      loadProducts(searchQuery);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery, loadProducts]);

  // 1. ДОБАВЛЕНИЕ (POST) с Оптимистичным обновлением
  const handleAddProduct = async (formData) => {
    const tempId = 'temp_' + Date.now();
    
    const productPayload = {
      title: formData.title || 'Новый товар с парсера',
      price: Number(formData.price) || 9999,
      category: formData.category || 'Электроника'
    };

    const optimisticProduct = {
      id: tempId,
      ...productPayload,
      store: 'Ozon',
      oldPrice: Math.round(productPayload.price * 1.25),
      discountPercent: 20,
      status: 'активен',
      createdAt: new Date().toISOString()
    };

    setProducts(prev => [optimisticProduct, ...prev]);
    toast.info('Добавление товара...');

    try {
      const realProduct = await createProduct(productPayload);

      setProducts(prev => prev.map(p => p.id === tempId ? { 
        ...realProduct, 
        price: Number(realProduct.price ?? productPayload.price),
        store: 'Ozon', 
        oldPrice: Math.round(Number(realProduct.price ?? productPayload.price) * 1.25), 
        discountPercent: 20 
      } : p));
      
      toast.success('Товар успешно сохранен в базе данных!');
    } catch (err) {
      console.error('Ошибка при создании:', err);
      setProducts(prev => prev.filter(p => p.id !== tempId));
      toast.error('Ошибка при сохранении на сервере');
    }
  };

  // 2. УДАЛЕНИЕ (DELETE) с Оптимистичным обновлением
  const handleDeleteProduct = async (id) => {
    const previousProducts = [...products];
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.info('Удаление товара...');

    try {
      await deleteProduct(id);
      toast.success('Товар удален');
    } catch (err) {
      console.error('Ошибка удаления:', err);
      setProducts(previousProducts);
      toast.error('Не удалось удалить товар на сервере');
    }
  };

  // 3. РЕДАКТИРОВАНИЕ (PUT) с Оптимистичным обновлением
  const handleUpdateProduct = async (id, updatedFields) => {
    const previousProducts = [...products];
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));

    try {
      await updateProduct(id, updatedFields);
      toast.success('Изменения сохранены');
    } catch (err) {
      console.error('Ошибка обновления:', err);
      setProducts(previousProducts);
      toast.error('Не удалось обновить данные на сервере');
    }
  };

  return (
    <div className={darkMode ? 'dark h-full' : 'h-full'}>
      <Toaster position="bottom-right" richColors />
      
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        notifications={notifications}
        onClearNotifications={() => setNotifications([])}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      >
        {loading && products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <div className="w-8 h-8 border-4 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-neutral-100 rounded-full animate-spin"></div>
            <p className="text-xs text-neutral-500 font-mono">Загрузка данных с сервера...</p>
          </div>
        ) : error && products.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-rose-200 dark:border-rose-900/50 rounded-lg p-8 text-center max-w-md mx-auto my-12 space-y-3">
            <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">{error}</p>
            <button 
              onClick={() => loadProducts(searchQuery)}
              className="px-4 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-lg text-xs font-medium hover:opacity-90"
            >
              Повторить попытку
            </button>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView 
              products={products} 
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              onOpenAddModal={() => setIsAddModalOpen(true)} 
            />
)}
            
            {/* Вот это место отвечает за вкладку «Товары» */}
            {activeTab === 'products' && (
              <ProductsView 
                products={products} 
                onDelete={handleDeleteProduct}
                onUpdate={handleUpdateProduct} 
                onSelectForStats={setSelectedProduct} 
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            )}

            {activeTab === 'discounts' && (
              <DiscountsView products={products} />
            )}
            {activeTab === 'notifications' && (
              <NotificationsView notifications={notifications} />
            )}
            {activeTab === 'settings' && (
              <SettingsView />
            )}
          </>
        )}
      </Layout>

      <AddProductDialog 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddProduct}
      />
      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      <AuthModal 
     isOpen={isAuthModalOpen} 
     onClose={() => setIsAuthModalOpen(false)} 
     onLoginSuccess={() => {
       // Перезагружаем список или обновляем статус
       loadProducts();
     }}
   />
   
    </div>
  );
}