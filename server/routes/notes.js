const express = require('express');
const Note = require('../models/Note');

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
router.post('/', async (req, res) => {
    const { title, text } = req.body;

try {
    const newNote = await Note.create(req.body);
    res.status(200).json(newNote);
} catch (error) {
    res.status(400).json({ message: error.message });
}
});

// DELETE a note
router.delete('/:id', (req, res) => {
    res.json({ message: 'DELETE a note' });
});

// UPDATE a note
router.patch('/:id', (req, res) => {
    res.json({ message: 'UPDATE a note' });
});

module.exports = router;
