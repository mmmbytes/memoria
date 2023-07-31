const mongoose = require('mongoose');

const Note = require('../models/Note');

const getLatestNote = async (req, res) => {
	const latestNote = await Note.findOne().sort({ updatedAt: -1 });

	if (!latestNote) {
		return res.status(204).end();
	}
	res.status(200).json(latestNote);
};

const getNote = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(400)
			.json({ statusCode: 400, message: 'Invalid note id' });
	}

	const note = await Note.findById(id);

	if (!note) {
		return res.status(404).json({ statusCode: 404, message: 'Note not found' });
	}
	res.status(200).json(note);
};

const getAllNotes = async (req, res) => {
	const notes = await Note.find({});

	if (notes.length === 0) {
		return res.status(204).end();
	}
	res.status(200).json(notes);
};

const createNote = async (req, res) => {
	const blankNote = {
		title: '',
		textbody: '',
	};
	try {
		const newNote = await Note.create(blankNote);
		res.status(200).json(newNote);
	} catch (error) {
		res.status(500).json({ statusCode: 500, message: error.message });
	}
};

const updateNote = async (req, res) => {
	const { id } = req.params;
	const { title, textbody } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Error saving note. Invalid note id.',
		});
	}

	const note = await Note.findOneAndUpdate(
		{ _id: id },
		{ title, textbody },
		{ new: true }
	);

	if (!note) {
		return res
			.status(404)
			.json({ statusCode: 404, message: 'Error saving note. Note not found.' });
	}
	res.status(200).json(note);
};

const deleteNote = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(400)
			.json({ statusCode: 400, message: 'Invalid note id' });
	}

	try {
		const note = await Note.findByIdAndDelete(id);
		if (!note) {
			return res
				.status(404)
				.json({ statusCode: 404, message: 'Note not found' });
		}
		res.status(200).json({ noteId: id });
	} catch (error) {
		res.status(500).json({ statusCode: 500, message: error.message });
	}
};

module.exports = {
	createNote,
	deleteNote,
	getAllNotes,
	getLatestNote,
	getNote,
	updateNote,
};
