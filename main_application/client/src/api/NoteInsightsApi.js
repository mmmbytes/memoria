import { apiRequest } from '../utils/ApiUtils';

export const fetchInsightsData = () => {
	return apiRequest('/api/insights/test-message');
};
