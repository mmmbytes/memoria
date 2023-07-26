const express = require('express');
const { exchangeAuthCode } = require('../controllers/auth');

const router = express.Router();

// router.get('/check', checkAuth);
router.post('/exchange', exchangeAuthCode);

module.exports = router;
