const express = require('express');
const router = express.Router();
const { userHandler } = require('../../controller');
const { asyncWrapper: _async } = require('../../config/asyncWrapper');

router.get('/test', [_async(userHandler.test)]);

router.get('/testauth', [_async(userHandler.testAuth)]);

router.post('/register', [_async(userHandler.register)]);

router.post('/login', [_async(userHandler.login)]);

module.exports = router;
