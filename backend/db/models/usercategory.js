'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCategory = sequelize.define('UserCategory', {
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  UserCategory.associate = function(models) {
    UserCategory.belongsToMany(models.User, { foreignKey: 'userId' });
    UserCategory.belongsToMany(models.Category, { foreignKey: 'categoryId' });
  };
  return UserCategory;
};