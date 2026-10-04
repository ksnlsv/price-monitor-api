const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Просмотр товаров — доступен любому авторизованному пользователю
router.get('/', auth, productController.getAll);
router.get('/:id', auth, productController.getOne);

// Управление товарами — только для администратора
router.post('/', auth, isAdmin, productController.create);
router.put('/:id', auth, isAdmin, productController.update);
router.delete('/:id', auth, isAdmin, productController.remove);

module.exports = router;