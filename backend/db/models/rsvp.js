'use strict';
module.exports = (sequelize, DataTypes) => {
  const RSVP = sequelize.define('RSVP', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  RSVP.associate = function(models) {
    RSVP.belongsToMany( models.User, { foreignKey: 'userId' });
    RSVP.belongsToMany( models.Event, { foreignKey: 'eventId' });
  };
  return RSVP;
};