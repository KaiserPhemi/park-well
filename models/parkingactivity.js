"use strict";
module.exports = (sequelize, DataTypes) => {
  var ParkingActivity = sequelize.define(
    "ParkingActivity",
    {
      note: {
        type: DataTypes.TEXT,
        length: "tiny"
      },
      carRegNo: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: { notEmpty: true }
      },
      carOwnerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        validate: { notEmpty: true }
      },
      exitTime: {
        type: DataTypes.DATE
      },
      parkingSpaceId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  ParkingActivity.associate = function(models) {};
  return ParkingActivity;
};
