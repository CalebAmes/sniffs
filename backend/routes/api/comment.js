const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const comment = await Comment.findAll();
  return res.json({ comment })
}))

router.post(
  '/',
  asyncHandler(async(req, res) => {
    const {
      userId, 
      content,
      eventId
    } = req.body;
    const comment = await Comment.createComment({
      userId, content, eventId
    });
    return res.json({ comment })
  })
)

module.exports = router;
