const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    textbody: String,
});

module.exports = mongoose.model('Note', noteSchema);
