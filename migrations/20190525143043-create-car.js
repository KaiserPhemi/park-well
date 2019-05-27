"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      regNo: {
        allowNull: false,
        unique: true,
        length: 12,
        type: Sequelize.STRING
      },
      brand: {
        allowNull: false,
        length: 30,
        type: Sequelize.STRING
      },
      model: {
        allowNull: false,
        length: 30,
        type: Sequelize.STRING
      },
      color: {
        allowNull: false,
        length: 20,
        type: Sequelize.STRING
      },
      parked: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      ownerEmail: {
        allowNull: false,
        type: Sequelize.STRING,
        onDelete: "SET NULL",
        references: {
          model: "Users",
          key: "email"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Cars");
  }
};
