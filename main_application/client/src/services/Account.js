import { fetchUserDetails } from '../api/AccountApi';

export const getUserDetails = async () => {
	try {
		const response = await fetchUserDetails();
		return response;
	} catch (error) {
		console.error(error);
		throw new Error(error.message);
	}
};
