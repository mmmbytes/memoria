const express = require('express');
const { deleteAccount } = require('../controllers/account');

const router = express.Router();

router.delete('/', deleteAccount);

module.exports = router;
