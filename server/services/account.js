const {
	CognitoIdentityProviderClient,
	AdminDeleteUserCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

const noteService = require('./note');
const REGION = 'us-east-1';
const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

const deleteAccount = async (sub, username) => {
	await noteService.deleteAllNotes(sub);
	const deleteCommand = new AdminDeleteUserCommand({
		UserPoolId: process.env.USER_POOL_ID,
		Username: username,
	});
	await cognitoClient.send(deleteCommand);
};

module.exports = { deleteAccount };
