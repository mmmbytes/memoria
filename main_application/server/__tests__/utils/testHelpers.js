function mockReqRes(params = {}, body = {}, sub = '') {
	const req = {
		params,
		body,
		sub,
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
