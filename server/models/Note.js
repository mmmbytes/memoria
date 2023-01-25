const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    text: String,
});

module.exports = mongoose.model('Note', NoteSchema);

/*
    images: [String],
    date: { type: Date, default: Date.now },
    tags: [String],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
*/
