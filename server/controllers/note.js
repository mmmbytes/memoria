const mongoose = require("mongoose");
const Note = require("../models/Note");

const getLatestNote = async (req, res) => {
	const latestNote = await Note.findOne().sort({ updatedAt: -1 });

	if (!latestNote) {
		return res.status(404).json({ error: `No notes found.` });
	}

	return res.status(200).json(latestNote);
};

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

const updateNote = async (req, res) => {
	const { id } = req.params;
	const { title, textbody } = req.body;

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

const deleteNote = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: `This note ID is not valid.` });
	}

	try {
		const note = await Note.findByIdAndDelete(id);

		if (!note) {
			return res.status(404).json({ error: `Note not found.` });
		}

		res.status(200).json({ message: `Note deleted.` });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getLatestNote,
	getNotes,
	createNote,
	updateNote,
	deleteNote,
};
