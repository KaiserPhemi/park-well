"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ParkingSpaces",
      [
        {
          title: "AP01",
          description: "Left end by the fence",
          vacant: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "AP02",
          description: "Small space by the entrance",
          vacant: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "AP03",
          description: "Close emergency exit door",
          vacant: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ParkingSpaces", null, {});
  }
};
