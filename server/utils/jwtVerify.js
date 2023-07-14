const { CognitoJwtVerifier } = require('aws-jwt-verify');
const jwt = require('jsonwebtoken');
const { stringify } = require('querystring');

const httpsRequest = require('./httpsRequest.js');
const setCookies = require('./setCookies.js');

const refreshTokens = async (refreshToken, res) => {
	const postData = stringify({
		grant_type: 'refresh_token',
		client_id: process.env.CLIENT_ID,
		refresh_token: refreshToken,
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
			accessToken: parsedData.access_token,
			idToken: parsedData.id_token,
		});
		return parsedData.access_token;
	} catch ({ statusCode, details }) {
		res.status(statusCode).json({
			error: `Server returned status code ${statusCode}`,
			details: details,
		});
	}
};

async function jwtVerify(req, res, next) {
	let { accessToken, refreshToken } = req.cookies;
	const currentTimestamp = Math.floor(Date.now() / 1000);

	if (!accessToken) {
		res.status(401).send('Unauthorized request. Missing tokens');
		return;
	}

	if (jwt.decode(accessToken).exp < currentTimestamp) {
		accessToken = await refreshTokens(refreshToken, res);
	}

	const verifier = CognitoJwtVerifier.create({
		userPoolId: process.env.USER_POOL_ID,
		tokenUse: 'access',
		clientId: process.env.CLIENT_ID,
	});

	try {
		await verifier.verify(accessToken);
		next();
	} catch (err) {
		console.error('Error verifying token: ', err);
		res.status(401).send('Unauthorized request. Invalid token');
	}
}

module.exports = jwtVerify;
