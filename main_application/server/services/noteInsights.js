const httpsRequest = require('../utils/httpsRequest');

const testInsights = async (data) => {
	const postData = JSON.stringify(data);

	const options = {
		hostname: 'analytics_service',
		port: 8000,
		path: '/test-message',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const response = await httpsRequest(options, postData);
		console.log(response);
		return response;
	} catch (error) {
		const { statusCode, message, details } = error;
		let err = {
			statusCode,
			message,
			details,
		};
		console.error(err);
		throw err;
	}
};

module.exports = { testInsights };
