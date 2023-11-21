const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	if (process.env.NODE_ENV !== 'UAT') {
		app.use(
			'/api',
			createProxyMiddleware({
				target: process.env.REACT_APP_MEMORIA_URL,
				changeOrigin: true,
			})
		);
	}
};
