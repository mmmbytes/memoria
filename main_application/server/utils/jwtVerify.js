const { CognitoJwtVerifier } = require('aws-jwt-verify');
const jwt = require('jsonwebtoken');
const { stringify } = require('querystring');

const httpsRequest = require('./networkRequest.js');
const setCookies = require('./setCookies.js');

const ONE_HOUR = 1000 * 60 * 60; // 1 hour in milliseconds

const refreshTokens = async (refreshToken, res) => {
	const postData = stringify({
		grant_type: 'refresh_token',
		client_id: process.env.CLIENT_ID,
		refresh_token: refreshToken,
	});

	const options = {
		protocol: 'https:',
		hostname: process.env.COGNITO_DOMAIN,
		path: '/oauth2/token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	};

	try {
		const parsedData = await httpsRequest(options, postData);
		setCookies(
			res,
			{
				accessToken: parsedData.access_token,
				idToken: parsedData.id_token,
			},
			{ maxAge: ONE_HOUR }
		);
		return {
			accessToken: parsedData.access_token,
			idToken: parsedData.id_token,
		};
	} catch (error) {
		console.error(error);
		res
			.status(error.statusCode || 500)
			.json({ statusCode: error.statusCode || 500, message: error.message });
	}
};

const handleAuthError = (res, message, error = {}) => {
	let err = {
		statusCode: 401,
		message,
		details: { message: error.message, stack: error.stack },
	};
	console.error(err);
	res.status(401).json({ statusCode: 401, message });
};

async function jwtVerify(req, res, next) {
	let { accessToken, idToken, refreshToken, isAuthenticated } = req.cookies;

	if (!isAuthenticated || !refreshToken) {
		handleAuthError(res, 'Session expired.');
		return;
	}

	if (!accessToken) {
		({ accessToken, idToken } = await refreshTokens(refreshToken, res));
	}

	const accessVerifier = CognitoJwtVerifier.create({
		userPoolId: process.env.USER_POOL_ID,
		tokenUse: 'access',
		clientId: process.env.CLIENT_ID,
	});

	const idVerifier = CognitoJwtVerifier.create({
		userPoolId: process.env.USER_POOL_ID,
		tokenUse: 'id',
		clientId: process.env.CLIENT_ID,
	});

	try {
		const accessClaims = await accessVerifier.verify(accessToken);
		const idClaims = await idVerifier.verify(idToken);

		if (accessClaims.sub !== idClaims.sub) {
			throw new Error('Access token and ID token do not match.');
		}

		req.sub = jwt.decode(idToken).sub; // sub = Cognito user id
		req.idToken = idToken;
		req.username = idClaims['cognito:username'] || idClaims['username'];
		next();
	} catch (error) {
		handleAuthError(
			res,
			'Redirecting to the login page to re-establish a valid session.',
			error
		);
	}
}

module.exports = jwtVerify;
