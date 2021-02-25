const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const eventRouter = require('./event');
const categoryRouter = require('./category');

router.post('/test', function(req, res){
  res.json({ requestBody: req.body });
});

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/event', eventRouter)
router.use('/category', categoryRouter)


module.exports = router;