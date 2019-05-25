"use strict";
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    "Car",
    {
      regNo: {
        allowNull: false,
        type: DataTypes.STRING,
        length: 12,
        unique: true,
        validate: { notEmpty: true }
      },
      brand: {
        allowNull: false,
        type: DataTypes.STRING,
        length: 30,
        validate: { notEmpty: true }
      },
      model: {
        allowNull: false,
        type: DataTypes.STRING,
        length: 30,
        validate: { notEmpty: true }
      },
      color: {
        allowNull: false,
        type: DataTypes.STRING,
        length: 20,
        validate: { notEmpty: true }
      },
      parked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true }
      }
    },
    {}
  );
  Car.associate = function(models) {
    Car.belongsTo(models.User, {
      foreignKey: "ownerId",
      onDelete: "SET NULL"
    });
  };
  return Car;
};
