const https = require('https');
const { stringify } = require('querystring');

const isJson = require('../utils/isJson.js');

const makeRequest = (options, postData, successCallback, errorCallback) => {
	console.log('making request1');
	const request = https.request(options, (response) => {
		let data = '';
		response.on('data', (chunk) => {
			data += chunk;
		});
		response.on('end', () => {
			try {
				if (response.statusCode >= 400) {
					const details = isJson(data) ? JSON.parse(data) : {};
					console.log('error1');
					return errorCallback(response.statusCode, details);
				}

				const parsedData = JSON.parse(data);
				console.log('Status: ', response.statusCode);
				console.log('success1');
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

	if (Buffer.byteLength(authCode, 'utf8') > 256) {
		return res.status(400).json({ error: 'Invalid auth code' });
	}

	console.log('authCode sanitized');

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
		console.log('parsedData: ', parsedData);
		console.log('Setting idToken cookie');
		res.cookie('idToken', parsedData.id_token, {
			httpOnly: true,
			sameSite: 'lax',
		});
		console.log('Setting accessToken cookie');
		res.cookie('accessToken', parsedData.access_token, {
			httpOnly: true,
			sameSite: 'lax',
		});
		console.log('Setting refreshToken cookie');
		res.cookie('refreshToken', parsedData.refresh_token, {
			httpOnly: true,
			sameSite: 'lax',
		});

		console.log('Sending success response');
		res.json({ success: true });
		console.log('Response sent');
	};

	const errorCallback = (statusCode, details) => {
		res.status(statusCode).json({
			error: `Server returned status code ${statusCode}`,
			details: details,
		});
	};

	console.log('making request');
	makeRequest(options, postData, successCallback, errorCallback);
};

module.exports = { exchangeAuthCode };
