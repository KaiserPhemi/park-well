"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ParkingSpaces", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        length: 20,
        unique: true,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        length: 100,
        type: Sequelize.STRING
      },
      vacant: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable("ParkingSpaces");
  }
};
