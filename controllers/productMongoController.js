const ProductMongo = require('../models/ProductMongo');

const productMongoController = {
  // 1. READ (GET /api/mongo/items) — получить все
  getAll: async (req, res, next) => {
    try {
      const items = await ProductMongo.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (error) {
      next(error);
    }
  },

  // 2. READ ONE (GET /api/mongo/items/:id) — получить один по ID
  getOne: async (req, res, next) => {
    try {
      const item = await ProductMongo.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  // 3. CREATE (POST /api/mongo/items) — создать новый товар
  create: async (req, res, next) => {
    try {
      const { title, price, category, stores } = req.body;
      const newItem = await ProductMongo.create({
        title,
        price,
        category: category || 'Электроника',
        stores: stores || [],
        priceHistory: [{ price }] // записываем первую цену в историю
      });
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  },

  // 4. UPDATE (PUT /api/mongo/items/:id) — обновить товар
  update: async (req, res, next) => {
    try {
      const updatedItem = await ProductMongo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      res.json(updatedItem);
    } catch (error) {
      next(error);
    }
  },

  // 5. DELETE (DELETE /api/mongo/items/:id) — удалить товар
  remove: async (req, res, next) => {
    try {
      const deletedItem = await ProductMongo.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      res.json({ message: 'Товар успешно удален из MongoDB' });
    } catch (error) {
      next(error);
    }
  },

  // 6. Вложенные структуры (POST /api/mongo/items/:id/history) — добавить цену во вложенный массив
  addPriceHistory: async (req, res, next) => {
    try {
      const { price } = req.body;
      const item = await ProductMongo.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Товар не найден' });
      }

      item.priceHistory.push({ price });
      item.price = price; // обновляем текущую цену
      await item.save();

      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = productMongoController;