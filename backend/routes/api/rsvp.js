const express = require('express');
const asyncHandler = require('express-async-handler');
const { Rsvp } = require('../../db/models');

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
    return res.json({ rsvp })
  })
)

router.delete(
  '/:id(\\d+/delete)',
  asyncHandler(async(req, res) => {
    const { id } = req.body;
    const rsvp = await Rsvp.findByPk(id);
    await rsvp.destroy();
    return res.json();
  })
);

module.exports = router;
