const express = require('express');
const asyncHandler = require('express-async-handler');
const { Rsvp, Event } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const rsvp = await Rsvp.findAll();
  return res.json({ rsvp })
}))

router.get(
  '/:id(\\d+/events)', asyncHandler(async (req, res) => {
    const id = req.params.id[0];
    const userRsvps = await Rsvp.findAll({ 
      where: {
        userId: id
      },
      include: Event,
    });
    return res.json(userRsvps);
  }
));

router.post(
  '/',
  asyncHandler(async(req, res) => {
    const {
      userId, 
      eventId
    } = req.body;
    await Rsvp.createRsvp({
      userId, eventId
    });
    
    const rsvp = await Rsvp.findOne({
      where: { 
        [Op.and]: [
          { eventId: eventId },
          { userId: userId },
        ]
      }, include: Event
    });
    
    return res.json(rsvp);
  })
)

router.delete(
  '/:id(\\d+/delete)',
  asyncHandler(async(req, res) => {
    const { eventId, userId } = req.body;
    const rsvp = await Rsvp.findAll({
      where: { 
        [Op.and]: [
          { eventId: eventId },
          { userId: userId },
        ]
      }
    });
    await rsvp.forEach(el => el.destroy());
    return res.json();
  })
);

module.exports = router;
