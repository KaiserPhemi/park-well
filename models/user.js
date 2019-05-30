"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        length: 50,
        validate: { notEmpty: true }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        length: 50,
        validate: { notEmpty: true }
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        length: 50,
        validate: { notEmpty: true }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        length: 15,
        validate: { notEmpty: true, isNumeric: true }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      roleTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: "default",
        validate: { notEmpty: true }
      }
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Car, { foreignKey: "ownerEmail" });
    User.hasMany(models.ParkingActivity, { foreignKey: "ownerEmail" });
    User.belongsTo(models.Role, {
      foreignKey: "roleTitle",
      onDelete: "SET NULL"
    });
  };
  return User;
};
