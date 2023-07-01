const express = require('express');
const { exchangeAuthCode } = require('../controllers/auth');

const router = express.Router();

router.post('/exchange', exchangeAuthCode);

module.exports = router;
