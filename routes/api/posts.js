const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
  res.json('Hi Welcome to posts ');
});

module.exports = router;
