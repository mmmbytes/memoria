const { stringify } = require('querystring');

const httpsRequest = require('../utils/httpsRequest.js');
const setCookies = require('../utils/setCookies.js');

const exchangeAuthCode = async (req, res) => {
	const { authCode } = req.body;

	if (!authCode || Buffer.byteLength(authCode, 'utf8') > 256) {
		return res
			.status(400)
			.json({ statusCode: 400, message: 'Invalid auth code' });
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
		const parsedData = await httpsRequest(options, postData);
		setCookies(res, {
			idToken: parsedData.id_token,
			accessToken: parsedData.access_token,
			refreshToken: parsedData.refresh_token,
		});
		setCookies(
			res,
			{ isAuthenticated: true },
			{ httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 30 } // 30 days
		);

		res.status(200).json({
			statusCode: 200,
			message: 'User logged in successfully',
		});
	} catch (error) {
		const { statusCode, message, details } = error;
		let err = {
			statusCode,
			message,
			details,
		};
		console.error(err);
		res.status(statusCode).json({ statusCode, message });
	}
};

module.exports = { exchangeAuthCode };
