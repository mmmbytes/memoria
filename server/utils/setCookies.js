const setCookies = (res, tokens) => {
	Object.entries(tokens).forEach(([name, value]) => {
		res.cookie(name, value, {
			httpOnly: true,
			sameSite: 'lax',
		});
	});
};

module.exports = setCookies;
