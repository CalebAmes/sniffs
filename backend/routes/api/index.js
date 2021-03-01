const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const eventRouter = require('./event');
const categoryRouter = require('./category');
const commentRouter = require('./comment');
const rsvpRouter = require('./rsvp')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/event', eventRouter);
router.use('/category', categoryRouter);
router.use('/rsvp', rsvpRouter);
router.use('/comment', commentRouter);


module.exports = router;