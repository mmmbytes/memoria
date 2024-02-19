const textbodyData = ({ _id, textbody }) => ({
	id: _id,
	textbody,
});

const fullNoteData = ({ _id, title, textbody }) => ({
	id: _id,
	title,
	textbody,
});

const filterNotesList = (notesList, filterType) => {
	const nonEmptyNotesList = notesList.filter(
		({ textbody }) => textbody.trim() !== ''
	);
	return nonEmptyNotesList.map(filterType);
};

module.exports = { filterNotesList, textbodyData, fullNoteData };
