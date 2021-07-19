'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rsvp = sequelize.define('Rsvp', {
    // id: {
    //   primaryKey: true,
    //   type: DataTypes.INTEGER,
    // },
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  Rsvp.associate = function(models) {
    Rsvp.belongsTo( models.User, { foreignKey: 'userId' });
    Rsvp.belongsTo( models.Event, { foreignKey: 'eventId' });
  };
  Rsvp.createRsvp = async function ({ id, userId, eventId }) {
    const rsvp = await Rsvp.create({ id, userId, eventId });
    return await Rsvp.findByPk(rsvp.id);
  }
  return Rsvp;
};
