const request = require('supertest');
const nock = require('nock');
const express = require('express');
require('dotenv').config();
const authController = require('../controllers/auth');

const app = express();
app.use(express.json());
app.post('/api/auth/exchange', authController.exchangeAuthCode);

const mockAuthCode = 'mockAuthCode';
const mockTokens = {
	access_token: 'mockAccessToken',
	refresh_token: 'mockRefreshToken',
	id_token: 'mockIdToken',
	token_type: 'Bearer',
	expires_in: 3600,
};

describe('exchange', () => {
	afterEach(() => {
		nock.cleanAll();
	});

	it('should exchange auth code for tokens successfully', async () => {
		nock('https://' + process.env.COGNITO_DOMAIN)
			.post('/oauth2/token')
			.reply(200, mockTokens);

		const response = await request(app)
			.post('/api/auth/exchange')
			.send({ authCode: mockAuthCode });

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ tokens: mockTokens });
	});

	it('should handle non-200 response from token endpoint', async () => {
		nock('https://' + process.env.COGNITO_DOMAIN)
			.post('/oauth2/token')
			.reply(400, { error: 'invalid_grant' });

		const response = await request(app)
			.post('/api/auth/exchange')
			.send({ authCode: mockAuthCode });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error');
	});

	it('should handle error parsing response from token endpoint', async () => {
		nock('https://' + process.env.COGNITO_DOMAIN)
			.post('/oauth2/token')
			.reply(200, 'invalid_json');

		const response = await request(app)
			.post('/api/auth/exchange')
			.send({ authCode: mockAuthCode });

		expect(response.status).toBe(500);
		expect(response.body).toHaveProperty('error');
	});

	it('should handle missing authCode in request body', async () => {
		nock('https://' + process.env.COGNITO_DOMAIN)
			.post('/oauth2/token')
			.reply(400, 'invalid_json');

		const response = await request(app).post('/api/auth/exchange').send({});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error');
	});

	it('should handle error thrown when making HTTPS request', async () => {
		nock('https://' + process.env.COGNITO_DOMAIN)
			.post('/oauth2/token')
			.replyWithError('An error occurred while making the HTTPS request.');

		const response = await request(app)
			.post('/api/auth/exchange')
			.send({ authCode: mockAuthCode });

		expect(response.status).toBe(500);
		expect(response.body).toHaveProperty('error');
	});
});
