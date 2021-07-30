const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment, User } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const comment = await Comment.findAll({ include: User });
  return res.json({ comment })
}))

router.post(
  '/',
  asyncHandler(async(req, res) => {
    const {
      userId, 
      content,
      eventId,
    } = req.body;
    const comment = await Comment.createComment({
      userId, content, eventId,
    });
    return res.json({ comment })
  })
)

router.put(
  '/:id',
  asyncHandler(async(req, res) => {
    const {
      content,
      id,
    } = req.body;
    const comment = await Comment.updateComment({
      commentId: id,
      content,
    });
    return res.json({ comment })
  })
)

router.delete(
  '/:id(\\d+/delete)',
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    const comment = await Comment.findByPk(id);
    comment.destroy();
    return res.json();
  })
);

module.exports = router;
