const Note = require('../models/Note');

const deleteAllNotes = async (sub) => {
	const result = await Note.deleteMany({ sub });
	return result;
};

const getAllNotes = async (sub) => {
	const notes = await Note.find({ sub });
	return notes;
};

module.exports = { deleteAllNotes, getAllNotes };
