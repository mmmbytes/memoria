const express = require("express");
const {
	getLatestNote,
	getNotes,
	createNote,
	updateNote,
} = require("../controllers/note");

const router = express.Router();

router.get("/latest", getLatestNote);

// GET all notes
router.get("/", getNotes);

// GET a single note
router.get("/:id", (req, res) => {
	res.json({ message: "GET a single note" });
});

// POST a new note
router.post("/", createNote);

// UPDATE a note
router.put("/:id", updateNote);

// DELETE a note
router.delete("/:id", (req, res) => {
	res.json({ message: "DELETE a note" });
});

module.exports = router;
