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
        type: Sequelize.STRING
      },
      brand: {
        allowNull: false,
        type: Sequelize.STRING
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING
      },
      parked: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "SET NULL",
        references: {
          model: "Users",
          key: "id"
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
