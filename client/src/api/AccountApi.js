import { apiRequest } from '../utils/ApiUtils';

export const deleteAccount = () => {
	const options = {
		method: 'DELETE',
	};
	return apiRequest('/api/account/', options);
};

export const fetchUserDetails = () => {
	return apiRequest('/api/account/');
};
