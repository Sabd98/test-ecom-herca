"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sellings", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      marketing_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "marketings",
          key: "id",
        },
      },
      transaction_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cargo_fee: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      grand_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("sellings");
  },
};
