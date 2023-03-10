const Note = require('./../models/Note');

// GET all notes

// GET a single note

// POST a new note
const createNote = async(req, res) => {
    const {title, textbody} = req.body;

    // add doc to db
    try {
        const newNote = await Note.create({title, textbody});
        res.status(200).json(newNote._id);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};
// DELETE a note

// UPDATE a note

module.exports = {
    createNote
};
