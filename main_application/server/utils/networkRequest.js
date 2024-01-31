const http = require('http');
const https = require('https');
const isJson = require('./isJson.js');

const networkRequest = async (options, postData) => {
	return new Promise((resolve, reject) => {
		const protocol = options.protocol === 'http:' ? http : https;

		const request = protocol.request(options, (response) => {
			let data = '';
			response.on('data', (chunk) => {
				data += chunk;
			});
			response.on('end', () => {
				try {
					if (response.statusCode >= 400) {
						console.log('Error Details:', parsedData);
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

module.exports = networkRequest;
