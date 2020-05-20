const express = require('express');
const router = express.Router();

router.use('/test', (req, res) => {
  res.json('Hi Welcome to profile ');
});

module.exports = router;
