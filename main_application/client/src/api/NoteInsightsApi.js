import { apiRequest } from '../utils/ApiUtils';

export const fetchInsightsData = (message) => {
	console.log('fetchInsightsData called');
	const options = {
		method: 'POST',
		body: JSON.stringify({ message }),
	};
	return apiRequest('/api/insights', options);
};
