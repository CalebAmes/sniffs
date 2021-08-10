const express = require("express");
const asyncHandler = require("express-async-handler");
const { Comment, User, Event } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const comment = await Comment.findAll({ include: User });
    return res.json({ comment });
  })
);

router.get(
  "/user/:id",
  asyncHandler(async function (req, res) {
    const comment = await Comment.findAll({
      where: {
        userId: req.params.id
      },
      include: Event
    });
    return res.json({ comment });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { userId, content, eventId } = req.body;
    const holderComment = await Comment.createComment({
      userId,
      content,
      eventId,
    });
    const comment = await Comment.findByPk(holderComment.id, { include: User });
    return res.json({ comment });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { content, id } = req.body;
    await Comment.updateComment({
      commentId: id,
      content,
    });
    const comment = await Comment.findByPk(id, { include: User });
    return res.json({ comment });
  })
);

router.delete(
  "/:id(\\d+/delete)",
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    const comment = await Comment.findByPk(id);
    comment.destroy();
    return res.json();
  })
);

module.exports = router;
