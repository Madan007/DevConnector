const express = require('express');
const router = express.Router();
//import routes
const users = require('./api/users');
const profile = require('./api/profile');
const posts = require('./api/posts');

//use routes
router.use('/users', users);
router.use('/profile', profile);
router.use('/posts', posts);

module.exports = router;
