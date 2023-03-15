require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const activeNoteRoutes = require('./routes/active-note');
const noteRoutes = require('./routes/note');

const app = express();

app.use(express.json());

// Log the request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/', activeNoteRoutes);
app.use('/api/notes', noteRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Listening on port', process.env.PORT);
    })  
  })
  .catch((err) => {
    console.log(err);
  });
  
