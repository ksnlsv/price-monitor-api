let products = require('../models/productModel');

// Показать весь список
exports.getAll = (req, res) => {
    res.json(products);
};

// Показать один товар по ID
exports.getOne = (req, res) => {
    const id = parseInt(req.params.id);
    const item = products.find(p => p.id === id);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: "Товар не найден" });
    }
};

// Добавить новый товар (например, через Postman)
exports.create = (req, res) => {
    const { title, price } = req.body;

    if (!title || !price) {
        return res.status(400).json({ error: "Укажите название и цену товара" });
    }

    const newItem = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        title,
        price
    };

    products.push(newItem);
    res.status(201).json(newItem);
};

// Обновить данные товара
exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        // Обновляем только те поля, которые прислали
        products[index] = { ...products[index], ...req.body, id };
        res.json(products[index]);
    } else {
        res.status(404).json({ error: "Нечего обновлять: товар не найден" });
    }
};

// Удалить товар из списка
exports.remove = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: "Товар успешно удален" });
    } else {
        res.status(404).json({ error: "Товар не найден" });
    }
};