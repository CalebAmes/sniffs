'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userId: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    breed: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Profile;
};