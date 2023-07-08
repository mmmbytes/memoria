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

function validateCookie(cookies, cookieName) {
	const cookie = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`));
	expect(cookie).toBeDefined();
	expect(cookie).toContain('HttpOnly');
}

module.exports = { mockReqRes, validateCookie };
