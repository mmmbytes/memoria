const setCookies = (
	res,
	tokens,
	options = { httpOnly: true, sameSite: 'lax' }
) => {
	const mergedOptions = { ...options };
	Object.entries(tokens).forEach(([name, value]) => {
		res.cookie(name, value, mergedOptions);
	});
};

module.exports = setCookies;
