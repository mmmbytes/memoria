import { fetchInsightsData } from '../api/NoteInsightsApi';

export const getInsightsData = async () => {
	try {
		const response = await fetchInsightsData();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
