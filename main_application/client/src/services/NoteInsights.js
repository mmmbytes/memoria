import { fetchInsightsData } from '../api/NoteInsightsApi';

export const getInsightsData = async (message) => {
	try {
		console.log('getInsightsData called');
		console.log(`message: ${message}`);
		const response = await fetchInsightsData(message);
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
