"use strict";
module.exports = (sequelize, DataTypes) => {
  const ParkingSpace = sequelize.define(
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
      }
    },
    {}
  );
  ParkingSpace.associate = models => {
    ParkingSpace.hasMany(models.ParkingActivity, {
      foreignKey: "parkingSpaceTitle"
    });
  };
  return ParkingSpace;
};
