import { apiRequest } from '../utils/ApiUtils';

export const fetchInsightsData = (message) => {
	const options = {
		method: 'POST',
		body: JSON.stringify({ message }),
	};
	return apiRequest('/api/insights/test-message', options);
};
