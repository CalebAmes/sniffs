'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rsvp = sequelize.define('Rsvp', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  Rsvp.associate = function(models) {
    Rsvp.belongsTo( models.User, { foreignKey: 'userId' });
    Rsvp.belongsTo( models.Event, { foreignKey: 'eventId' });
  };
  Rsvp.createRsvp = async function ({ userId, eventId }) {
    const rsvp = await Rsvp.create({ userId, eventId });
    return await Rsvp.findByPk(rsvp.id);
  }
  return Rsvp;
};
