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

	const response = await httpRequest(options, data);
	return response;
};

module.exports = { testInsights };
