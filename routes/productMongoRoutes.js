const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productMongoController');

// Базовые CRUD маршруты
router.get('/', ctrl.getAll);          // Получить все
router.get('/:id', ctrl.getOne);       // Получить один по ID
router.post('/', ctrl.create);         // Создать
router.put('/:id', ctrl.update);       // Обновить
router.delete('/:id', ctrl.remove);    // Удалить

// Работа с вложенным массивом (история цен)
router.post('/:id/history', ctrl.addPriceHistory);

module.exports = router;