"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        length: 50,
        type: Sequelize.STRING,
        validate: { notEmpty: true }
      },
      lastName: {
        allowNull: false,
        length: 50,
        type: Sequelize.STRING,
        validate: { notEmpty: true }
      },
      department: {
        allowNull: false,
        length: 50,
        type: Sequelize.STRING,
        validate: { notEmpty: true }
      },
      phoneNumber: {
        allowNull: false,
        length: 15,
        type: Sequelize.STRING,
        validate: { notEmpty: true, isNumeric: true }
      },
      email: {
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        },
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: { notEmpty: true }
      },
      roleTitle: {
        type: Sequelize.STRING,
        onDelete: "SET NULL",
        references: {
          model: "Roles",
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
    return queryInterface.dropTable("Users");
  }
};
