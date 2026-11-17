import React, { useState } from 'react';
import { X, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true); // true = Вход, false = Регистрация
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoginMode && password !== confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    if (!isLoginMode && password.length < 6) {
      toast.error('Пароль должен быть не менее 6 символов');
      return;
    }

    setLoading(true);

    // Имитация запроса на сервер
    setTimeout(() => {
      setLoading(false);
      const fakeToken = 'fake_jwt_token_for_demo_' + Date.now();
      localStorage.setItem('token', fakeToken);
      
      if (isLoginMode) {
        toast.success('Успешный вход в систему!');
      } else {
        toast.success('Регистрация прошла успешно! Вы вошли в систему.');
      }

      if (onLoginSuccess) onLoginSuccess(fakeToken);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {isLoginMode ? 'Вход в PricePulse' : 'Регистрация аккаунта'}
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            {isLoginMode ? 'Введите свои данные для доступа к системе' : 'Создайте новый аккаунт для мониторинга цен'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-neutral-400" />
              <input 
                type="email" 
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">Пароль</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-neutral-400" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none"
              />
            </div>
          </div>

          {!isLoginMode && (
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">Повторите пароль</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-neutral-400" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 flex items-center justify-center gap-2 transition-opacity mt-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Обработка...' : (isLoginMode ? 'Войти в систему' : 'Зарегистрироваться')}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-neutral-500">
          {isLoginMode ? (
            <p>
              Ещё нет аккаунта?{' '}
              <button 
                onClick={() => setIsLoginMode(false)} 
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Зарегистрироваться
              </button>
            </p>
          ) : (
            <p>
              Уже есть аккаунт?{' '}
              <button 
                onClick={() => setIsLoginMode(true)} 
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Войти
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};