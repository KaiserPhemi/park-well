"use strict";
// process.env.NODE_ENV = "test";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Roles",
      [
        {
          title: "default",
          description: "The default user with no access to the system.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "operator",
          description: "User with access to the system but no admin rights.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "admin",
          description: "User with admin access to the system.",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  }
};
