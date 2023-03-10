const Note = require('./../models/Note');
const mongoose = require('mongoose');

// GET all notes
const getNotes = async (req, res) => {
    const notes = await Note.find({});

    res.status(200).json(notes); 
};
// GET a single note

// POST a new note
const createNote = async (req, res) => {
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
const updateNote = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `This note does not exist.`});
    } 

    const note = await Note.findOneAndUpdate({_id: id}, {...req.body});
    
    if (!note) {
        return res.status(400).json({error: `This note does not exist.`});
    } 
    
    res.status(200).json(note);
};

module.exports = {
    getNotes,
    createNote,
    updateNote
};
