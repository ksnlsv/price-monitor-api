const { Product } = require('../models');


const productController = {
  
  getAll: async (req, res, next) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  
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

  
  create: async (req, res, next) => {
    try {
      const { title, price, category } = req.body;
      const newProduct = await Product.create({
        title,
        price,
        category: category || 'general'
      });
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },

  
  update: async (req, res, next) => {
    try {
      const { title, price, category } = req.body;
      const [updatedCount] = await Product.update(
        { title, price, category },
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