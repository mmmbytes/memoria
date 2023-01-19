const express = require('express');
const router = express.Router();

// GET all notes
router.get('/', () => {
    res.json({ message: 'GET all notes' });
});

module.exports = router;

// GET a single note
router.get('/:id', (req, res) => {
    res.json({ message: 'GET a single note' });
});

// POST a new note
router.post('/', (req, res) => {
    res.json({ message: 'POST a new note' });
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
