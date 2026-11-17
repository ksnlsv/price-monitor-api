require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth');

const app = express(); // <--- Сначала создаем app
const PORT = 3000;

// Middleware (CORS и JSON)
app.use(cors());
app.use(express.json());

// Подключение MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Маршруты (Роуты)
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/mongo/items', require('./routes/productMongoRoutes')); // <--- ТЕПЕРЬ ВСЁ ОК, app уже создан

app.get('/', (req, res) => {
  res.send('<h1>Система мониторинга цен работает</h1>');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});