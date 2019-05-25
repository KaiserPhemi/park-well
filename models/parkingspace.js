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
      },
      carRegNo: {
        allowNull: false,
        type: DataTypes.STRING,
        length: 12,
        unique: true,
        validate: { notEmpty: true }
      }
    },
    {}
  );
  ParkingSpace.associate = models => {
    ParkingSpace.belongsTo(models.Cars, {
      foreignKey: "regNo",
      onDelete: "SET NULL"
    });
  };
  return ParkingSpace;
};
