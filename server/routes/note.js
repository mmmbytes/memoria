const express = require("express");
const {
	getLatestNote,
	getNotes,
	createNote,
	updateNote,
	deleteNote,
} = require("../controllers/note");

const router = express.Router();

router.get("/latest", getLatestNote);

router.get("/", getNotes);

// GET a single note
router.get("/:id", (req, res) => {
	res.json({ message: "GET a single note" });
});

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

module.exports = router;
