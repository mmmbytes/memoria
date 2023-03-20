const mongoose = require("mongoose");
const Note = require("../models/Note");
const { title, textbody } = req.body;

const getNotes = async (req, res) => {
	const notes = await Note.find({});

	res.status(200).json(notes);
};

const createNote = async (req, res) => {
	const { title, textbody } = req.body;

	try {
		const newNote = await Note.create({ title, textbody });
		res.status(200).json(newNote);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
// DELETE a note

const updateNote = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: `This note does not exist.` });
	}

	const note = await Note.findOneAndUpdate(
		{ _id: id },
		{ title, textbody },
		{ new: true }
	);

	if (!note) {
		return res.status(400).json({ error: `Note not found.` });
	}

	res.status(200).json(note);
};

module.exports = {
	getNotes,
	createNote,
	updateNote,
};
