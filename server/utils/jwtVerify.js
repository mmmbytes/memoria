const { CognitoJwtVerifier } = require('aws-jwt-verify');

async function jwtVerify(req, res, next) {
	const accessToken = req.cookies.accessToken;

	if (!accessToken) {
		res.status(401).send('Unauthorized request. Invalid tokens');
		return;
	}

	const verifier = CognitoJwtVerifier.create({
		userPoolId: process.env.USER_POOL_ID,
		tokenUse: 'access',
		clientId: process.env.CLIENT_ID,
	});

	try {
		const payload = await verifier.verify(accessToken);
		console.log('Token is valid. Payload:', payload);
		next();
	} catch (err) {
		console.log(err);
		res.status(401).send('Unauthorized request. Invalid tokens');
		return;
	}
}

module.exports = jwtVerify;
