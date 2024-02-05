const insightsService = require('../services/noteInsights');

const testInsights = async (req, res) => {
	try {
		const responseMessage = await insightsService.getNotesSimilarityData(
			req.sub
		);
		res.status(200).json(responseMessage);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { testInsights };
