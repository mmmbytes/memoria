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
	return notesList.map(filterType);
};

module.exports = { filterNotesList, textbodyData, fullNoteData };
