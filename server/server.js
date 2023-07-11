const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const jwtVerify = require('./utils/jwtVerify');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/note');

if (process.env.NODE_ENV !== 'UAT') {
	dotenv.config();
}

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use('/api/auth', authRoutes);
app.use(jwtVerify);
app.use('/api/notes', noteRoutes);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('Listening on port', process.env.PORT);
		});
	})
	.catch((err) => {
		console.log(err);
	});
