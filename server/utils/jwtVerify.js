const { CognitoJwtVerifier } = require('aws-jwt-verify');
const { stringify } = require('querystring');

const makeRequest = require('./httpsRequest.js');
const setCookies = require('./setCookies.js');

async function jwtVerify(req, res, next) {
	const { accessToken, refreshToken } = req.cookies;

	if (!accessToken) {
		res.status(401).send('Unauthorized request. Missing tokens');
		return;
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
		if (err.name === 'TokenExpiredError') {
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
				const parsedData = await makeRequest(options, postData);
				setCookies(res, {
					accessToken: parsedData.access_token,
					idToken: parsedData.id_token,
				});
				next();
			} catch ({ statusCode, details }) {
				res.status(statusCode).json({
					error: `Server returned status code ${statusCode}`,
					details: details,
				});
			}
		} else {
			console.error('Error verifying token: ', err);
			res.status(401).send('Unauthorized request. Invalid token');
		}
	}
}

module.exports = jwtVerify;
