const express = require('express');
const {
	createNote,
	deleteNote,
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

module.exports = router;
