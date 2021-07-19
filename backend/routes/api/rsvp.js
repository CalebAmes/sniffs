const express = require('express');
const asyncHandler = require('express-async-handler');
const { Rsvp } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const rsvp = await Rsvp.findAll();
  return res.json({ rsvp })
}))

router.post(
  '/',
  asyncHandler(async(req, res) => {
    const {
      id,
      userId, 
      eventId
    } = req.body;
    const rsvp = await Rsvp.createRsvp({
      id, userId, eventId
    });
    console.log('this is rsvp in post ------------------------', rsvp);
    return res.json({ rsvp })
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
