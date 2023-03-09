const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    textbody: String,
});

module.exports = mongoose.model('Note', NoteSchema);
