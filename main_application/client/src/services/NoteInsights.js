import { fetchNoteInsights } from '../api/NoteInsightsApi';

export const getNoteInsights = async () => {
	try {
		const notesData = await fetchNoteInsights();
		return notesData;
	} catch (error) {
		throw new Error(error);
	}
};
