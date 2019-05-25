"use strict";
module.exports = (sequelize, DataTypes) => {
  var ParkingSpace = sequelize.define(
    "ParkingSpace",
    {
      title: {
        type: DataTypes.STRING,
        length: 20,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true }
      },
      description: {
        type: DataTypes.STRING,
        length: 100,
        allowNull: false,
        validate: { notEmpty: true }
      },
      vacant: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      carRegNo: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: { notEmpty: true }
      }
    },
    {}
  );
  ParkingSpace.associate = models => {};
  return ParkingSpace;
};
