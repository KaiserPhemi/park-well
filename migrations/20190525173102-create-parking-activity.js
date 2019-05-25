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
        type: Sequelize.TEXT
      },
      carRegNo: {
        type: Sequelize.STRING,
        onDelete: "SET NULL",
        references: {
          model: "Cars",
          key: "regNo"
        }
      },
      carOwnerId: {
        type: Sequelize.INTEGER,
        onDelete: "SET NULL",
        references: {
          model: "Users",
          key: "id"
        }
      },
      exitTime: {
        type: Sequelize.DATE
      },
      parkingSpaceId: {
        type: Sequelize.INTEGER,
        onDelete: "SET NULL",
        references: {
          model: "ParkingSpaces",
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
    return queryInterface.dropTable("ParkingActivities");
  }
};
