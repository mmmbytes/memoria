const express = require('express');

const { testInsights } = require('../controllers/noteInsights');

const router = express.Router();

router.post('/test-message', testInsights);

module.exports = router;
