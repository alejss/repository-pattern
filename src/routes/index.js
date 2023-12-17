const express = require('express');
const router = express.Router();

const health = require('../handler/health')
const users = require('../handler/users')


router.use('/health', health)
router.use('/users', users)

module.exports = router