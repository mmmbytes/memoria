if (process.env.NODE_ENV !== 'UAT') {
	require('dotenv').config();
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const noteRoutes = require('./routes/note');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use('/api/notes', noteRoutes);

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
