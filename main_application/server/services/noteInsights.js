const httpRequest = require('../utils/networkRequest');
const NoteService = require('./note');

const filterNotesList = (notesList) => {
	notesList.map(({ _id, textbody }) => ({ _id, textbody }));
};

const getNotesSimilarityData = async (sub) => {
	const notes = await NoteService.getAllNotes(sub);
	const filteredNotesList = filterNotesList(notes);

	const response = await sendNotesList(filteredNotesList);
	return response;
};

const sendNotesList = async (notesList) => {
	const options = {
		protocol: 'http:',
		hostname: 'analytics_service',
		port: 8000,
		path: '/notes_similarity',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const response = await httpRequest(options, JSON.stringify(notesList));
	return response;
};

module.exports = { getNotesSimilarityData };
