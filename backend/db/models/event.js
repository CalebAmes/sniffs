'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    dateStart: DataTypes.INTEGER,
    dateEnd: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.RSVP, { foreignKey: 'eventId'});
    Event.belongsToMany(models.User, { 
      through: 'RSVP', otherKey: 'userId', foreignKey: 'eventId'
    });

    Event.hasMany(models.Comment, { foreignKey: 'eventId'});

    Event.belongsTo(models.Category, { foreignKey: 'categoryId'});

    Event.createEvent = async function ({ 
      name, description, dateStart, dateEnd, categoryId, userId
    }) {
      const event = await Event.create({
        name, description, dateStart, dateEnd, categoryId, userId
      });
      return await Event.findByPk(event.id);
    }
  };
  return Event;
};