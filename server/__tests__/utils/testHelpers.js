function mockReqRes(params = {}, body = {}) {
	const req = {
		params,
		body,
	};
	const res = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	};
	return { req, res };
}

module.exports = { mockReqRes };
