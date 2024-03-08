import { apiRequest } from '../utils/ApiUtils';

export const fetchNoteInsights = () => {
	return apiRequest('/api/insights/');
};
