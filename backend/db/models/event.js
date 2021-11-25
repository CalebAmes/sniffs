"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      dateStart: DataTypes.INTEGER,
      dateEnd: DataTypes.INTEGER,
      photo: DataTypes.ARRAY(DataTypes.STRING(500)),
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      latitude: DataTypes.INTEGER,
      longitude: DataTypes.INTEGER,
    },
    {}
  );
  Event.associate = function (models) {
    Event.hasMany(models.Rsvp, { foreignKey: "eventId" });

    Event.hasMany(models.Comment, { foreignKey: "eventId" });

    Event.belongsTo(models.User, { foreignKey: "userId" });

    Event.belongsTo(models.Category, { foreignKey: "categoryId" });
  };
  Event.createEvent = async function ({
    name,
    description,
    dateStart,
    dateEnd,
    categoryId,
    userId,
  }) {
    const event = await Event.create({
      name,
      description,
      dateStart,
      dateEnd,
      categoryId,
      userId,
    });
    return await Event.findByPk(event.id);
  };
  Event.updateEvent = async function ({
    id,
    name,
    description,
    dateStart,
    dateEnd,
    categoryId,
    userId,
  }) {
    const event = await Event.findByPk(id);
    event.name = name;
    event.description = description;
    event.dateStart = dateStart;
    event.dateEnd = dateEnd;
    event.categoryId = categoryId;
    event.userId = userId;
    await event.save();
    return await Event.findByPk(id);
  };

  return Event;
};
