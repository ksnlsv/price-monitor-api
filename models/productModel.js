'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Здесь прописываются связи с другими таблицами (если будут)
    }
  }

  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products' // Имя таблицы в PostgreSQL
  });

  return Product;
};