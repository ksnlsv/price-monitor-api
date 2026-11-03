import React from 'react';
import { Bell, CheckCheck } from 'lucide-react';

export const NotificationsView = ({ notifications, onClearNotifications }) => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Уведомления</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">История системных алертов о падении и росте цен</p>
        </div>
        {notifications.length > 0 && (
          <button onClick={onClearNotifications} className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 rounded-lg transition-colors">
            <CheckCheck className="w-3.5 h-3.5" /> Очистить все
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg divide-y divide-neutral-100 dark:divide-neutral-800">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-xs text-neutral-400 flex flex-col items-center justify-center">
            <Bell className="w-8 h-8 text-neutral-300 dark:text-neutral-700 mb-2" />
            Список уведомлений пуст
          </div>
        ) : (
          notifications.map(n => (
            <div key={n.id} className="p-4 flex items-start gap-3 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/25 transition-colors">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100 shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">{n.title}</h4>
                  <span className="text-[10px] font-mono text-neutral-400">{n.time}</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{n.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};