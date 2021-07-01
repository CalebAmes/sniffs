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

router.delete(
  '/:id(\\d+/delete)',
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    const comment = await Comment.findByPk(id);
    comment.destroy();
    return res.json();
  })
);

// router.delete(
// 	'/:id(\\d+/delete)',
// 	asyncHandler(async (req, res) => {
// 		const { id } = req.body;
// 		const message = await ChannelMessage.findByPk(id);
// 		message.destroy();
// 		return res.json();
// 	})
// );

module.exports = router;
