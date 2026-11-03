import React, { useState } from 'react';
import { LayoutDashboard, Package, Percent, Bell, Settings, Sun, Moon, Search, Menu, X } from 'lucide-react';

export const Layout = ({ children, activeTab, setActiveTab, darkMode, setDarkMode, notifications, onClearNotifications, searchQuery, setSearchQuery }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Товары', icon: Package },
    { id: 'discounts', label: 'Скидки', icon: Percent },
    { id: 'notifications', label: 'Уведомления', icon: Bell, badge: unreadCount },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 h-14 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-neutral-500">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-neutral-900 dark:bg-neutral-100 rounded flex items-center justify-center text-white dark:text-neutral-900 font-bold text-xs">P</div>
            <span className="font-semibold text-sm">PricePulse</span>
          </div>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
            <input 
            type="text" 
            placeholder="Поиск товаров на сервере..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // <--- Обязательно должно обновлять стейт!
            className="w-full bg-neutral-100 dark:bg-neutral-800 border-0 rounded-lg pl-9 pr-4 py-1.5 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none"
              />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="relative">
            <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg relative">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-600 rounded-full"></span>}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl py-2 z-50">
                <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-100 dark:border-neutral-800 text-xs font-semibold">
                  <span>Уведомления</span>
                  <button onClick={onClearNotifications} className="text-neutral-400">Очистить</button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? <p className="text-xs text-neutral-400 text-center py-4">Нет новых уведомлений</p> :
                    notifications.map(n => (
                      <div key={n.id} className="px-4 py-3 border-b border-neutral-50 dark:border-neutral-800/50 text-xs">
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">{n.title}</p>
                        <p className="text-neutral-500 mt-0.5">{n.description}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main & Sidebar */}
      <div className="flex-1 flex">
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transform transition-transform lg:translate-x-0 lg:static lg:w-56 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${isActive ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto overflow-y-auto">
          {children}
        </main>
      </div>

      <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-4 px-6 text-xs text-neutral-500 flex justify-between">
        <p>© 2026 PricePulse Inc.</p>
        <span className="font-mono text-[11px]">v1.0.4-prod</span>
      </footer>
    </div>
  );
};