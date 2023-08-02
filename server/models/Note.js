const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
	{
		title: String,
		textbody: String,
		sub: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Note', noteSchema);
