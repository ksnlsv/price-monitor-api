'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'status', {
      type: Sequelize.STRING,
      defaultValue: 'активен',
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'url');
    await queryInterface.removeColumn('Products', 'image');
    await queryInterface.removeColumn('Products', 'status');
  }
};