require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// СНАЧАЛА middleware для JSON
app.use(express.json());

// ПОТОМ маршруты
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Система мониторинга цен работает</h1>');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});