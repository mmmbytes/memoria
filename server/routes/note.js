const express = require('express');
const {
    getNotes,
    createNote,
    updateNote
} = require('../controllers/note');


const router = express.Router();

// GET all notes
router.get('/', getNotes);

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
router.patch('/:id', updateNote);

module.exports = router;
