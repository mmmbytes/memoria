const DEFAULT_OPTIONS = { httpOnly: true, sameSite: 'lax' };

const setCookies = (res, tokens, options = {}) => {
	const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

	Object.entries(tokens).forEach(([name, value]) => {
		res.cookie(name, value, mergedOptions);
	});
};

module.exports = setCookies;
