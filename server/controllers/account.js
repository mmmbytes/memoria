const {
	CognitoIdentityProviderClient,
	AdminDeleteUserCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

const jwt = require('jsonwebtoken');

const REGION = 'us-east-1';

const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

const deleteAccount = async (req, res) => {
	const idToken = req.idToken;
	const decoded = jwt.decode(idToken);
	const username = decoded['cognito:username'] || decoded['username'];

	try {
		const deleteCommand = new AdminDeleteUserCommand({
			UserPoolId: process.env.COGNITO_USER_POOL_ID,
			Username: username,
		});
		await cognitoClient.send(deleteCommand);
		res.status(200).json({ message: 'User deleted' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { deleteAccount };
