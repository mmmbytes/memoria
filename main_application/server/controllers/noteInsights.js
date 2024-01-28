const insightsService = require('../services/noteInsights');

const testInsights = async (req, res) => {
	try {
		const testMessage = await insightsService.testInsights(req.body);
		res.status(200).json(testMessage);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { testInsights };
