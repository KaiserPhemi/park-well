"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ParkingActivities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.TEXT()
      },
      carRegNo: {
        allowNull: false,
        type: Sequelize.STRING,
        onDelete: "SET NULL",
        references: {
          model: "Cars",
          key: "regNo"
        }
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
      exitTime: {
        type: Sequelize.DATE
      },
      parkingSpaceTitle: {
        allowNull: false,
        type: Sequelize.STRING,
        onDelete: "SET NULL",
        references: {
          model: "ParkingSpaces",
          key: "title"
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
    return queryInterface.dropTable("ParkingActivities");
  }
};
