import React, { useState } from 'react';
import { toast } from 'sonner';

export const SettingsView = () => {
  const [frequency, setFrequency] = useState('3h');
  const [token, setToken] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Настройки успешно сохранены в систему');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Настройки</h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Управление параметрами парсера и интеграциями</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">Частота парсинга цен</h2>
          <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="freq" checked={frequency === '3h'} onChange={() => setFrequency('3h')} className="accent-neutral-900 dark:accent-neutral-100" />
              <span>Каждые 3 часа (Стандартный режим)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="freq" checked={frequency === '1h'} onChange={() => setFrequency('1h')} className="accent-neutral-900 dark:accent-neutral-100" />
              <span>Каждый час (PRO режим)</span>
            </label>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">Telegram Webhook для алертов</h2>
          <input 
            type="text" 
            placeholder="@my_price_bot token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none font-mono"
          />
          <button type="submit" className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-4 py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">
            Сохранить параметры
          </button>
        </div>
      </form>
    </div>
  );
};