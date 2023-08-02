const setCookies = (res, tokens, options = {}) => {
	const defaultOptions = { httpOnly: true, sameSite: 'lax' };
	const mergedOptions = { ...defaultOptions, ...options };

	Object.entries(tokens).forEach(([name, value]) => {
		res.cookie(name, value, mergedOptions);
	});
};

module.exports = setCookies;
