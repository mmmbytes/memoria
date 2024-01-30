const express = require('express');

const { testInsights } = require('../controllers/noteInsights');

const router = express.Router();

router.post('/test-message', testInsights);
console.log('noteInsights.js router.post called');

module.exports = router;
