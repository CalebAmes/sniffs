"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserCategory = sequelize.define(
    "UserCategory",
    {
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {}
  );
  UserCategory.associate = function (models) {
    UserCategory.belongsTo(models.User, { foreignKey: "userId" });
    UserCategory.belongsTo(models.Category, { foreignKey: "categoryId" });
  };
  return UserCategory;
};
