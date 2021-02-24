'use strict';
module.exports = (sequelize, DataTypes) => {
  const RSVP = sequelize.define('RSVP', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  RSVP.associate = function(models) {
    RSVP.belongsTo( models.User, { foreignKey: 'userId' });
    RSVP.belongsTo( models.Event, { foreignKey: 'eventId' });
  };
  return RSVP;
};