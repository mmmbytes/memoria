const setCookies = (
	res,
	tokens,
	options = { httpOnly: true, sameSite: 'lax' }
) => {
	Object.entries(tokens).forEach(([name, value]) => {
		res.cookie(name, value, options);
	});
};

module.exports = setCookies;
