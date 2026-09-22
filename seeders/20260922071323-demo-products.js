'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      { title: 'Телефон', price: 50000, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Пылесос', price: 15000, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Ноутбук', price: 90000, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Чайник', price: 3000, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};