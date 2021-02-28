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
  RSVP.createRSVP = async function ({ userId, eventId }) {
    const rsvp = await RSVP.create({ userId, eventId });
    return await RSVP.findByPk(rsvp.id);
  }
  return RSVP;
};
