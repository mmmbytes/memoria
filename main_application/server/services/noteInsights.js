const httpRequest = require('../utils/networkRequest');
const { getAllNotes } = require('./note');
const {
	filterNotesList,
	textbodyData,
	fullNoteData,
} = require('../utils/filterNotesList');

const getNotesSimilarityData = async (sub) => {
	const notes = await getAllNotes(sub);
	if (notes.length < 3) {
		return { message: 'Not enough notes to compare' };
	}
	const textbodyList = filterNotesList(notes, textbodyData);
	const similarityData = await sendNotesList(textbodyList);
	return {
		notesList: filterNotesList(notes, fullNoteData),
		similarityData: similarityData.noteSimilarities,
	};
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
