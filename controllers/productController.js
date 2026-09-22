const { Product } = require('../models');

// Определение контроллеров для работы с БД
const productController = {
  // GET /api/products — Получение всех товаров
  getAll: async (req, res, next) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/products/:id — Получение одного товара
  getOne: async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  // POST /api/products — Создание нового товара
  create: async (req, res, next) => {
    try {
      const { name, url, currentPrice, discountPercent } = req.body;
      const newProduct = await Product.create({ name, url, currentPrice, discountPercent });
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/products/:id — Обновление товара
  update: async (req, res, next) => {
    try {
      const { name, url, currentPrice, discountPercent } = req.body;
      const [updatedCount] = await Product.update(
        { name, url, currentPrice, discountPercent },
        { where: { id: req.params.id } }
      );

      if (updatedCount === 0) {
        return res.status(404).json({ message: 'Товар не найден' });
      }

      const updatedProduct = await Product.findByPk(req.params.id);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/products/:id — Удаление товара
  remove: async (req, res, next) => {
    try {
      const deletedCount = await Product.destroy({ where: { id: req.params.id } });
      if (deletedCount === 0) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      res.json({ message: 'Товар успешно удален из базы данных' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = productController;