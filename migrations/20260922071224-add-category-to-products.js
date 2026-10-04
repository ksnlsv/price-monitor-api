'use strict';

module.exports = {
  // up: добавляем новую колонку category в таблицу Products
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'category', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'general'
    });
  },

  // down: при откате миграции удаляем эту колонку
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'category');
  }
};