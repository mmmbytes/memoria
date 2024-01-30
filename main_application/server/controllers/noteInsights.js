const insightsService = require('../services/noteInsights');

const testInsights = async (req, res) => {
	try {
		console.log('testInsights called');
		console.log(req.body);
		const testMessage = await insightsService.testInsights(req.body);
		res.status(200).json(testMessage);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = { testInsights };
