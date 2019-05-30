"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true }
      }
    },
    {}
  );
  Role.associate = models => {
    Role.hasMany(models.User, {
      foreignKey: "roleTitle"
    });
  };
  return Role;
};
