const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Просмотр товаров — доступен любому авторизованному пользователю
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);

// Управление товарами — только для администратора
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

module.exports = router;