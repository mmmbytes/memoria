const express = require('express');

const {
	getLatestNote,
	getNote,
	getAllNotes,
	createNote,
	updateNote,
	deleteNote,
} = require('../controllers/note');

const router = express.Router();

router.get('/latest', getLatestNote);

router.get('/:id', getNote);

router.get('/', getAllNotes);

router.post('/', createNote);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote);

module.exports = router;
