"use strict";
// third party library
const bcrypt = require("bcrypt");

// salt for password encryption
const salting = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Kingsley",
          lastName: "Obi",
          email: "king@gmail.com",
          department: "Engineering",
          phoneNumber: "09033445241",
          roleTitle: "default",
          password: bcrypt.hashSync("oluwafemi", salting),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Geras",
          lastName: "Kronika",
          email: "geras@gmail.com",
          department: "Engineering",
          phoneNumber: "09033445247",
          roleTitle: "default",
          password: bcrypt.hashSync("oluwafemi", salting),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Hattori",
          lastName: "Hanzo",
          email: "shinobi@gmail.com",
          department: "Learning Dev.",
          phoneNumber: "09033445941",
          roleTitle: "default",
          password: bcrypt.hashSync("oluwafemi", salting),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
