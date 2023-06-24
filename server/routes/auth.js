const express = require('express');
const https = require('https');
const qs = require('querystring');
const router = express.Router();

router.post('/exchange', (req, res) => {
	const { authCode } = req.body;

	const postData = qs.stringify({
		grant_type: 'authorization_code',
		client_id: process.env.CLIENT_ID,
		code: authCode,
		redirect_uri: process.env.REDIRECT_URI,
	});

	const options = {
		hostname: process.env.COGNITO_DOMAIN,
		path: '/oauth2/token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	};

	const request = https.request(options, (response) => {
		let data = '';
		response.on('data', (chunk) => {
			data += chunk;
		});
		response.on('end', () => {
			res.json({ tokens: JSON.parse(data) });
		});
	});

	request.on('error', (error) => {
		console.log(error);
		res.status(500).json({ error: 'Error exchanging auth code for tokens' });
	});

	request.write(postData);
	request.end();
});

module.exports = router;
