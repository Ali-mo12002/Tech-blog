const router = require('express').Router();
const comment = require('./comment-routes')
const posts = require('./post-routes')
const users = require('./user-routes')


router.use('/comment', comment);
router.use('/posts', posts);
router.use('/users', users);
module.exports = router;
