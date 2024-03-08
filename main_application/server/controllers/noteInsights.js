const insightsService = require('../services/noteInsights');

const getNotesSimilarityData = async (req, res) => {
	try {
		const notesData = await insightsService.getNotesSimilarityData(req.sub);
		if (notesData.message) {
			return res.status(422).json({ message: notesData.message });
		}
		res.status(200).json(notesData);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { getNotesSimilarityData };
