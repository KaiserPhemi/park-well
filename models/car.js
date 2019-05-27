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
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      ownerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      }
    },
    {}
  );
  Car.associate = function(models) {
    Car.hasMany(models.ParkingActivity, { foreignKey: "carRegNo" });
    Car.belongsTo(models.User, {
      foreignKey: "ownerEmail",
      onDelete: "SET NULL"
    });
  };
  return Car;
};
