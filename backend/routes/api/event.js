const express = require('express');
const asyncHandler = require('express-async-handler');
const { Event } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const event = await Event.findAll();
  return res.json({ event })
}))

router.post(
  '/', 
  asyncHandler(async(req, res) => {
    const { 
      name, 
      description, 
      dateStart, 
      dateEnd, 
      categoryId, 
      userId 
    } = req.body;
    const event = await Event.createEvent({
      name, description, dateStart, dateEnd, categoryId, userId
    });
    return res.json({
      event,
    })
  })
)

module.exports = router;