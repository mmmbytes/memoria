const express = require("express");
const { getLatestNote } = require("../controllers/active-note");

const router = express.Router();

router.get("/", getLatestNote);

module.exports = router;
