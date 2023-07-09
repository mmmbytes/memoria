const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const jwt = require('jsonwebtoken');

const poolData = {
	UserPoolId: process.env.USER_POOL_ID,
	ClientId: process.env.CLIENT_ID,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function jwtVerify(req, res, next) {
	const accessToken = req.cookies.accessToken;
	const idToken = req.cookies.idToken;
	const refreshToken = req.cookies.refreshToken;

	if (!accessToken || !idToken || !refreshToken) {
		res.status(401).send('Unauthorized request');
		return;
	}

	const decodedIdToken = jwt.decode(idToken);
	const username = decodedIdToken['cognito:username'];

	const userData = {
		Username: username,
		Pool: userPool,
	};

	const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	cognitoUser.getSession((err, session) => {
		if (err || !session.isValid()) {
			res.status(401).send('Unauthorized request');
			return;
		}
		next();
	});
}

module.exports = jwtVerify;
