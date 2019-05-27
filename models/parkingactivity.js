"use strict";
module.exports = (sequelize, DataTypes) => {
  const ParkingActivity = sequelize.define(
    "ParkingActivity",
    {
      note: {
        type: DataTypes.TEXT,
        length: "medium"
      },
      carRegNo: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: { notEmpty: true }
      },
      ownerEmail: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true, notEmpty: true }
      },
      exitTime: {
        type: DataTypes.DATE
      },
      parkingSpaceTitle: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: { notEmpty: true }
      }
    },
    {}
  );
  ParkingActivity.associate = models => {
    // associations can be defined here
  };
  return ParkingActivity;
};
