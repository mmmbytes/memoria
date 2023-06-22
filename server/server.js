if (process.env.NODE_ENV !== 'UAT') {
	require('dotenv').config();
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const noteRoutes = require('./routes/note');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
console.log(1);

app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use('/api/notes', noteRoutes);
console.log(2);

/*
app.get('/auth/callback', (req, res) => {
	console.log('Heading to index.html');
	res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
*/

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
