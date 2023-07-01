const https = require('https');
const { stringify } = require('querystring');

const isJson = require('../utils/isJson.js');

const makeRequest = (options, postData, successCallback, errorCallback) => {
	const request = https.request(options, (response) => {
		let data = '';
		response.on('data', (chunk) => {
			data += chunk;
		});
		response.on('end', () => {
			try {
				if (response.statusCode >= 400) {
					const details = isJson(data) ? JSON.parse(data) : {};
					return errorCallback(response.statusCode, details);
				}

				const parsedData = JSON.parse(data);
				successCallback(parsedData);
			} catch (error) {
				console.error(error);
				errorCallback(500, { error: 'Error parsing response from server' });
			}
		});
	});

	request.on('error', (error) => {
		console.error(error);
		errorCallback(500, { error: 'Error making HTTPS request.' });
	});

	request.write(postData);
	request.end();
};

const exchangeAuthCode = (req, res) => {
	const { authCode } = req.body;

	const postData = stringify({
		grant_type: 'authorization_code',
		client_id: process.env.CLIENT_ID,
		code: authCode,
		redirect_uri: process.env.REDIRECT_URI,
	});

	const options = {
		hostname: process.env.COGNITO_DOMAIN,
		path: '/oauth2/token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	};

	const successCallback = (parsedData) => {
		res.json({ tokens: parsedData });
	};

	const errorCallback = (statusCode, details) => {
		res.status(statusCode).json({
			error: `Server returned status code ${statusCode}`,
			details: details,
		});
	};

	makeRequest(options, postData, successCallback, errorCallback);
};

module.exports = { exchangeAuthCode };
