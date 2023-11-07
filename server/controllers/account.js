const accountService = require('../services/account');

const deleteAccount = async (req, res) => {
	try {
		await accountService.deleteAccount(req.sub, req.username);
		res.status(200).json({ message: 'Account and notes successfully deleted' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getUserDetails = async (req, res) => {
	try {
		const userDetails = await accountService.getUserDetails(req.username);
		res.status(200).json(userDetails);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { deleteAccount, getUserDetails };
