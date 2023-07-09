const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const jwt = require('jsonwebtoken');

const poolData = {
	UserPoolId: process.env.USER_POOL_ID,
	ClientId: process.env.CLIENT_ID,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function jwtVerify(req, res, next) {
	console.log(poolData);
	const accessToken = req.cookies.accessToken;
	const idToken = req.cookies.idToken;
	const refreshToken = req.cookies.refreshToken;

	if (!accessToken || !idToken || !refreshToken) {
		res.status(401).send('Unauthorized request. Invalid tokens');
		return;
	}

	const decodedIdToken = jwt.decode(idToken);
	const username = decodedIdToken['cognito:username'];

	const userData = {
		Username: username,
		Pool: userPool,
	};

	console.log(
		'Verifying ' + username + ' in user Pool ' + userPool + ' is authenticated'
	);
	console.log(userPool);
	console.log(JSON.stringify(userPool));

	const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	console.log('cognitoUser: ' + cognitoUser);

	const cognitoUser2 = userPool.getCurrentUser();
	console.log('cognitoUser2: ');
	console.log(cognitoUser2);
	console.log(JSON.stringify(cognitoUser2));

	cognitoUser.getSession((err, session) => {
		if (err || !session.isValid()) {
			res.status(401).send('Unauthorized request. Invalid session');
			return;
		}
		console.log(username + ' is authenticated');
		next();
	});
}

module.exports = jwtVerify;
