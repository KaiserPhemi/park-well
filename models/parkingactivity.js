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
    ParkingActivity.belongsTo(models.User, {
      foreignKey: "ownerEmail",
      onDelete: "SET NULL"
    });
    ParkingActivity.belongsTo(models.ParkingSpace, {
      foreignKey: "parkingSpaceTitle",
      onDelete: "SET NULL"
    });
    ParkingActivity.belongsTo(models.Car, {
      foreignKey: "carRegNo",
      onDelete: "SET NULL"
    });
  };
  return ParkingActivity;
};
