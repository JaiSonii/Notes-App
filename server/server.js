const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(bodyParser.json())

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/notesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple schema and model for MongoDB
const notesSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model('Note', notesSchema);

// API routes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/api/notes', async (req, res) => {
  const newNote = new Note({ title: req.body.title, content: req.body.content });
  try {
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
