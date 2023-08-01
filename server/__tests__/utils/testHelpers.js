function mockReqRes(params = {}, body = {}, cookies = {}) {
	const req = {
		params,
		body,
		cookies,
	};
	const res = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
		end: jest.fn(),
	};
	return { req, res };
}

function validateCookie(cookies, cookieName, cookieValue) {
	const cookie = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`));
	expect(cookie).toBeDefined();
	expect(cookie).toContain('HttpOnly');
	expect(cookie).toContain(cookieValue);
}

module.exports = { mockReqRes, validateCookie };
