'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {}
  }

Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'general'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'активен'
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products' 
  });

  return Product;
};