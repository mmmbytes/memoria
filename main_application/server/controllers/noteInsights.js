const insightsService = require('../services/noteInsights');

const testInsights = async (req, res) => {
	const message = JSON.stringify(req.body);
	try {
		console.log('testInsights called with message: ' + message);
		const testMessage = await insightsService.testInsights(message);
		res.status(200).json(testMessage);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = { testInsights };
