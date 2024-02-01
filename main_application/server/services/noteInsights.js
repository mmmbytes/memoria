const httpRequest = require('../utils/networkRequest');

const testInsights = async (data) => {
	const options = {
		protocol: 'http:',
		hostname: 'analytics_service',
		port: 8000,
		path: '/test-message',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const response = await httpRequest(options, data);
		return response;
	} catch (error) {
		const { statusCode, message, details } = error;
		let err = {
			statusCode,
			message,
			details,
		};
		throw err;
	}
};

module.exports = { testInsights };
