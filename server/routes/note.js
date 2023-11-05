const express = require('express');
const {
	createNote,
	deleteNote,
	deleteAllNotes,
	getAllNotes,
	getLatestNote,
	getNote,
	updateNote,
} = require('../controllers/note');

const router = express.Router();

router.get('/latest', getLatestNote);

router.get('/:id', getNote);

router.get('/', getAllNotes);

router.post('/', createNote);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote);

router.delete('/', deleteAllNotes);

module.exports = router;
