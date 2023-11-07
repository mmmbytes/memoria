const Note = require('../models/Note');

const deleteAllNotes = async (sub) => {
	const result = await Note.deleteMany({ sub });
	return result;
};

module.exports = { deleteAllNotes };
