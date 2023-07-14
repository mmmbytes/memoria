const { stringify } = require('querystring');

const makeRequest = require('../utils/httpsRequest.js');
const setCookies = require('../utils/setCookies.js');

const exchangeAuthCode = async (req, res) => {
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

	try {
		const parsedData = await makeRequest(options, postData);
		setCookies(res, {
			idToken: parsedData.id_token,
			accessToken: parsedData.access_token,
			refreshToken: parsedData.refresh_token,
		});

		res.status(200).json({
			status: 'success',
			message: 'User logged in successfully',
		});
	} catch ({ statusCode, details }) {
		res.status(statusCode).json({
			error: `Server returned status code ${statusCode}`,
			details: details,
		});
	}
};

const checkAuth = (req, res) => {
	const idToken = req.cookies.idToken;
	const accessToken = req.cookies.accessToken;

	if (idToken && accessToken) {
		res.json({ isAuthenticated: true });
	} else {
		res.json({ isAuthenticated: false });
	}
};

module.exports = { exchangeAuthCode, checkAuth };
