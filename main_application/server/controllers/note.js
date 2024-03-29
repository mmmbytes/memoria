//TODO: Create service layers for all note controller functions
const mongoose = require('mongoose');

const Note = require('../models/Note');
const noteService = require('../services/note');

const getLatestNote = async (req, res) => {
	const latestNote = await Note.findOne({ sub: req.sub }).sort({
		updatedAt: -1,
	});

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

	const note = await Note.findOne({ _id: id, sub: req.sub });

	if (!note) {
		return res.status(404).json({ statusCode: 404, message: 'Note not found' });
	}
	res.status(200).json(note);
};

const getAllNotes = async (req, res) => {
	try {
		const notes = await noteService.getAllNotes(req.sub);
		if (notes.length === 0) {
			return res.status(204).end();
		}
		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json({ statusCode: 500, message: error.message });
	}
};

const createNote = async (req, res) => {
	const blankNote = {
		title: '',
		textbody: '',
		sub: req.sub,
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
		{ _id: id, sub: req.sub },
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
		const note = await Note.findOneAndDelete({ _id: id, sub: req.sub });
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

const deleteAllNotes = async (req, res) => {
	try {
		const notesDeletedCount = await noteService.deleteAllNotes(req.sub);
		if (notesDeletedCount === 0) {
			return res
				.status(204)
				.json({ statusCode: 204, message: 'No notes found' });
		}
		res.status(200).json({ message: 'All notes deleted' });
	} catch (error) {
		res.status(500).json({ statusCode: 500, message: error.message });
	}
};

module.exports = {
	createNote,
	deleteNote,
	deleteAllNotes,
	getAllNotes,
	getLatestNote,
	getNote,
	updateNote,
};
