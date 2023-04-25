'use strict';
// import Accounts from './accountsModel'


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
        // references: {
        //   model: 'accounts',
        //   key: 'id',
        // },
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};
