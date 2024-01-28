import { fetchInsightsData } from '../api/NoteInsightsApi';

export const getInsightsData = async (message) => {
	try {
		const response = await fetchInsightsData(message);
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
