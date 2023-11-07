const jwt = require('jsonwebtoken');

const accountService = require('../services/account');

const deleteAccount = async (req, res) => {
	const sub = req.sub;
	const idToken = req.idToken;
	const decoded = jwt.decode(idToken);
	const username = decoded['cognito:username'] || decoded['username'];

	try {
		await accountService.deleteAccount(sub, username);
		res.status(200).json({ message: 'Account and notes successfully deleted' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { deleteAccount };
