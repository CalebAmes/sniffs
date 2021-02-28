const express = require('express');
const asyncHandler = require ('express-async-handler');
const { RSVP } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const rsvp = await RSVP.findAll();
  return res.json({ rsvp })
}));

router.post(
  '/',
  asyncHandler(async(req, res) => {
    const {
      userId, 
      eventId,
    } = req.body;
    const rsvp = await RSVP.createRSVP({
      userId, eventId
    });
    return res.json({ rsvp })
  })
)

module.exports = router;