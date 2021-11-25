const express = require("express");
const asyncHandler = require("express-async-handler");
const { Event, Comment, Rsvp, User } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const event = await Event.findAll({
      order: [["id", "DESC"]],
    });
    return res.json({ event });
  })
);

router.get(
  "/:id",
  asyncHandler(async function (req, res) {
    const { id } = req.params;
    const event = await Event.findByPk(id, {
      include: [
        {
          model: Rsvp,
          include: User,
        },
        {
          model: Comment,
          include: User,
        },
        User,
      ],
      order: [
        [Comment, "id", "ASC"],
        [Rsvp, "id", "DESC"],
      ],
    });
    return res.json({ event });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, description, dateStart, dateEnd, categoryId, userId } =
      req.body;
    const event = await Event.createEvent({
      name,
      description,
      dateStart,
      dateEnd,
      categoryId,
      userId,
    });
    return res.json({ event });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, dateStart, dateEnd, categoryId, userId } =
      req.body;

    const e = await Event.updateEvent({
      name,
      description,
      dateStart,
      dateEnd,
      categoryId,
      userId,
      id,
    });

    const event = await Event.findByPk(e.id, {
      order: [["id", "ASC"]],
      include: [
        {
          model: Rsvp,
          include: User,
        },
        {
          model: Comment,
          include: User,
        },
        User,
      ],
    });
    return res.json({ event });
  })
);

router.delete(
  "/:id(\\d+/delete)",
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    const event = await Event.findByPk(id);
    const comments = await Comment.findAll({
      where: {
        eventId: id,
      },
    });
    const rsvps = await Rsvp.findAll({
      where: {
        eventId: id,
      },
    });
    comments.forEach((comment) => comment.destroy());
    rsvps.forEach((rsvp) => rsvp.destroy());
    event.destroy();
    return res.json();
  })
);

module.exports = router;
