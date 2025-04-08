const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Read existing notes
let notes = [];
const NOTES_FILE = path.join(__dirname, 'notes.json');

if (fs.existsSync(NOTES_FILE)) {
  notes = JSON.parse(fs.readFileSync(NOTES_FILE));
}

// GET all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST a new note
app.post('/api/notes', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const newNote = {
    id: Date.now(),
    text,
    timestamp: new Date().toLocaleString()
  };

  notes.push(newNote);
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
  res.status(201).json(newNote);
});

// DELETE all notes
app.delete('/api/notes', (req, res) => {
  notes = [];
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
  res.json({ message: 'All notes deleted' });
});

app.listen(PORT, () => {
  console.log(`Astral Space running at http://localhost:${PORT}`);
});
