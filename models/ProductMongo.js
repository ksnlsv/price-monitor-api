const mongoose = require('mongoose');

const productMongoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, default: 'Электроника' },
  priceHistory: [
    {
      price: Number,
      date: { type: Date, default: Date.now }
    }
  ],
  stores: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductMongo', productMongoSchema);