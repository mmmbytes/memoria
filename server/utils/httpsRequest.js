const https = require('https');
const isJson = require('./isJson.js');

const httpsRequest = async (options, postData) => {
	return new Promise((resolve, reject) => {
		const request = https.request(options, (response) => {
			let data = '';
			response.on('data', (chunk) => {
				data += chunk;
			});
			response.on('end', () => {
				try {
					if (response.statusCode >= 400) {
						const parsedData = isJson(data) ? JSON.parse(data) : {};
						return reject({
							statusCode: response.statusCode,
							message: 'Request failed',
							details: parsedData,
						});
					}
					const parsedData = JSON.parse(data);
					resolve(parsedData);
				} catch (error) {
					reject({
						statusCode: 500,
						message: 'Error parsing response from server',
						details: { message: error.message, stack: error.stack },
					});
				}
			});
		});

		request.on('error', (error) => {
			reject({
				statusCode: 500,
				message: 'Error making HTTPS request',
				details: { message: error.message, stack: error.stack },
			});
		});

		request.write(postData);
		request.end();
	});
};

module.exports = httpsRequest;
