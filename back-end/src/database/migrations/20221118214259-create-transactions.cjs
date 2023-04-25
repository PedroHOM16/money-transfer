'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      debitedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
        // references: {
        //   model: 'users',
        //   key: 'accountId',
        // },
      },
      creditedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
        // references: {
        //   model: 'users',
        //   key: 'accountId',
        // },
      },
      value: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};
