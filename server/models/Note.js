const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    text: String,
});

module.exports = mongoose.model('Note', NoteSchema);
