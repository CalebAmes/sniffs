const express = require('express');
const asyncHandler = require('express-async-handler');
const { Event, Comment, Rsvp } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const event = await Event.findAll({
    order: [
      ['id', 'ASC'],
  ],
  });
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
      userId, 
    } = req.body;
    const event = await Event.createEvent({
      name, description, dateStart, dateEnd, categoryId, userId
    });
    return res.json({ event })
  })
)

router.delete(
  '/:id(\\d+/delete)',
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    const event = await Event.findByPk(id);
    const comments = await Comment.findAll({
      where:{
        eventId: id
      }
    })
    const rsvps = await Rsvp.findAll({
      where:{
        eventId: id
      }
    })
    console.log('this is the event: ', event)
    console.log('this is the comments: ', comments)
    comments.forEach(comment => comment.destroy())
    rsvps.forEach(rsvp => rsvp.destroy())
    event.destroy()
    return res.json();
  })
);

module.exports = router;
