const express = require('express');
const asyncHandler = require('express-async-handler');
const { Event } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  // const { name, description } = req.body;
  const event = await Event.findAll();
  return res.json({ event })
}))


module.exports = router;