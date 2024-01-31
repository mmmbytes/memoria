const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('express-async-errors');

const jwtVerify = require('./utils/jwtVerify');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/note');
const insightsRoutes = require('./routes/noteInsights');
const accountRoutes = require('./routes/account');

if (process.env.NODE_ENV !== 'UAT') {
	dotenv.config();
}

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	console.log(req.body);
	next();
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', jwtVerify, noteRoutes);
console.log('server entry point 2024');
app.use('/api/insights', jwtVerify, insightsRoutes);
app.use('/api/account', jwtVerify, accountRoutes);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	console.error(err);
	res
		.status(500)
		.json({ statusCode: 500, message: 'An unexpected error occurred' });
});

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('Listening on port', process.env.PORT);
		});
	})
	.catch((err) => {
		console.error(err);
	});
