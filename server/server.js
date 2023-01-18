require('dotenv').config();

const express = require('express');
const noteRoutes = require('./routes/notes');

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/notes', noteRoutes);

// Listen for requests
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
