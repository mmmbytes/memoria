const https = require('https');
const isJson = require('./isJson.js');

const makeRequest = async (options, postData) => {
	return new Promise((resolve, reject) => {
		const request = https.request(options, (response) => {
			let data = '';
			response.on('data', (chunk) => {
				data += chunk;
			});
			response.on('end', () => {
				try {
					if (response.statusCode >= 400) {
						const details = isJson(data) ? JSON.parse(data) : {};
						return reject({ statusCode: response.statusCode, details });
					}
					const parsedData = JSON.parse(data);
					resolve(parsedData);
				} catch (error) {
					reject({
						statusCode: 500,
						details: { error: 'Error parsing response from server' },
					});
				}
			});
		});

		request.on('error', (error) => {
			console.error(error);
			reject({
				statusCode: 500,
				details: { error: 'Error making HTTPS request' },
			});
		});

		request.write(postData);
		request.end();
	});
};

module.exports = makeRequest;
