const Note = require("../models/Note");
const mongoose = require("mongoose");

const getLatestNote = async (req, res) => {
	const latestNote = await Note.findOne().sort({ updatedAt: -1 });

	if (!latestNote) {
		return res.status(404).json({ error: `No notes found.` });
	}

	return res.status(200).json(latestNote);
};

module.exports = {
	getLatestNote,
};
