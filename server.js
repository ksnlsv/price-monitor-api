require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Система мониторинга цен работает</h1><p>Перейдите на /api/products, чтобы увидеть товары</p>');
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});