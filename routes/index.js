const express = require('express');
const authenticateJWT = require('../middleware/auth')
const router = express.Router();

//authentification (signup and login) routes
router.use('/auth', require('./auth'))

//user related actions routes - login required
router.use('/user', authenticateJWT, require('./user'))

//task related actions routes - login required
router.use('/task', authenticateJWT, require('./task'))

module.exports = router;