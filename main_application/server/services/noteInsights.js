const httpRequest = require('../utils/networkRequest');
const NoteService = require('./note');

const filterNotesList = (notesList) => {
	return notesList.map(({ _id, textbody }) => ({ id: _id, textbody }));
};

const getNotesSimilarityData = async (sub) => {
	const notes = await NoteService.getAllNotes(sub);
	if (notes.length < 3) {
		return { message: 'Not enough notes to compare' };
	}
	const filteredNotesList = filterNotesList(notes);
	const notesData = await sendNotesList(filteredNotesList);
	return notesData;
};

const sendNotesList = async (notesList) => {
	const options = {
		protocol: 'http:',
		hostname: 'analytics_service',
		port: 8000,
		path: '/note_similarities',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const response = await httpRequest(options, JSON.stringify(notesList));
	return response;
};

module.exports = { getNotesSimilarityData };
