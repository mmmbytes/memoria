const {
	CognitoIdentityProviderClient,
	AdminDeleteUserCommand,
	AdminGetUserCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

const noteService = require('./note');
const REGION = 'us-east-1';
const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

const getCognitoParams = (username) => ({
	UserPoolId: process.env.USER_POOL_ID,
	Username: username,
});

const deleteAccount = async (sub, username) => {
	const params = getCognitoParams(username);
	await noteService.deleteAllNotes(sub);
	const deleteCommand = new AdminDeleteUserCommand(params);
	await cognitoClient.send(deleteCommand);
};

const getUserDetails = async (username) => {
	const params = getCognitoParams(username);

	try {
		const response = await cognitoClient.send(new AdminGetUserCommand(params));

		const nameDetails = response.UserAttributes.find(
			(attr) => attr.Name === 'name'
		);
		const emailDetails = response.UserAttributes.find(
			(attr) => attr.Name === 'email'
		);

		const userDetails = {
			name: nameDetails ? nameDetails.Value : null,
			email: emailDetails ? emailDetails.Value : null,
		};
		return userDetails;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = { deleteAccount, getUserDetails };
