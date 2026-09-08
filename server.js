const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// Чтобы сервер мог принимать JSON-данные
app.use(express.json());

// Подключаем наши товары по адресу /api/products
app.use('/api/products', productRoutes);

// Простая проверка в браузере
app.get('/', (req, res) => {
    res.send('<h1>Система мониторинга цен работает</h1><p>Перейдите на /api/products, чтобы увидеть товары</p>');
});

// Запуск
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});