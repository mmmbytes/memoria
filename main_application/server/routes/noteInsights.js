const express = require('express');

const { getNotesSimilarityData } = require('../controllers/noteInsights');

const router = express.Router();

router.get('/', getNotesSimilarityData);

module.exports = router;
