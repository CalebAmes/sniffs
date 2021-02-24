'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.UserCategory, { foreignKey: 'categoryId'});
    Category.hasMany(models.User, { 
      through: 'UserCategory', otherKey: 'userId', foreignKey: 'categoryId'
    });

    Category.hasMany(models.Event, { foreignKey: 'categoryId'});
  };
  return Category;
};