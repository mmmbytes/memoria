const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/exchange', authController.exchangeAuthCode);

module.exports = router;
