const express = require('express');
const { deleteAccount, getUserDetails } = require('../controllers/account');

const router = express.Router();

router.delete('/', deleteAccount);

router.get('/', getUserDetails);

module.exports = router;
