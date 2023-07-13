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
				errorCallback(500, { error: 'Error parsing response from server' });
			}
		});
	});

	request.on('error', (error) => {
		console.error(error);
		errorCallback(500, { error: 'Error making HTTPS request' });
	});

	request.write(postData);
	request.end();
};

const exchangeAuthCode = (req, res) => {
	const { authCode } = req.body;

	if (!authCode || Buffer.byteLength(authCode, 'utf8') > 256) {
		return res.status(400).json({ error: 'Invalid auth code' });
	}

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
		res.cookie('idToken', parsedData.id_token, {
			httpOnly: true,
			sameSite: 'lax',
		});

		res.cookie('accessToken', parsedData.access_token, {
			httpOnly: true,
			sameSite: 'lax',
		});

		res.cookie('refreshToken', parsedData.refresh_token, {
			httpOnly: true,
			sameSite: 'lax',
		});

		res.status(200).json({
			status: 'success',
			message: 'User logged in successfully',
		});
	};

	const errorCallback = (statusCode, details) => {
		res.status(statusCode).json({
			error: `Server returned status code ${statusCode}`,
			details: details,
		});
	};

	makeRequest(options, postData, successCallback, errorCallback);
};

const checkAuth = (req, res) => {
	const idToken = req.cookies.idToken;
	const accessToken = req.cookies.accessToken;
	console.log('Token: ', idToken);
	console.log('Access: ', accessToken);

	if (idToken && accessToken) {
		res.json({ isAuthenticated: true });
	} else {
		res.json({ isAuthenticated: false });
	}
};

module.exports = { exchangeAuthCode, checkAuth };
