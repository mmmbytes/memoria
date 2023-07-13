const { CognitoJwtVerifier } = require('aws-jwt-verify');

async function jwtVerify(req, res, next) {
	const accessToken = req.cookies.accessToken;

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
		console.error('Error verifying token: ', err);
		res.status(401).send('Unauthorized request. Invalid token');
		return;
	}
}

module.exports = jwtVerify;
