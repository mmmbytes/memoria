const express = require('express');
const {
    createNote,
} = require('./../controllers/note.ctrl');


const router = express.Router();

// GET all notes
router.get('/', (req, res) => {
    res.json({ message: 'GET all notes' });
});

// GET a single note
router.get('/:id', (req, res) => {
    res.json({ message: 'GET a single note' });
});

// POST a new note
router.post('/', createNote);   

// DELETE a note
router.delete('/:id', (req, res) => {
    res.json({ message: 'DELETE a note' });
});

// UPDATE a note
router.patch('/:id', (req, res) => {
    res.json({ message: 'UPDATE a note' });
});

module.exports = router;
