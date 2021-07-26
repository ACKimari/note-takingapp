const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const fs = require('fs');

const PORT = 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

app.get('/api/notes', (req, res) => {
    
    res.json(`${req.method} request received to get notes`);
    res.sendFile(path.join(__dirname, './db/db.json'));
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
  });

app.post('/api/notes', (req, res) => {
  
  console.info(`${req.method} request received to add notes`);

  // Destructuring assignment for the items in req.body
  let userNote = {};
  userNote.body = req.body.newNote;

  // If all the required properties are present
  if (userNote.body.title && userNote.body.text) {
    fs.readFileSync((path.join(__dirname, './db/db.json')), function (error, content) {
        var data = JSON.parse(content);
    });

    // Lets say we have an array of numbers all 0 or greater. Each number only appears in the array once. How do we find the smallest number (that is still greater than 0) that is NOT in the array.


    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json('Error in posting notes');
  }

  res.redirect('/');
});

app.delete('/api/notes/:id', (req, res) => {
  
    console.info(`${req.method.id} request received to delete notes`);
  
    // Destructuring assignment for the items in req.body
    const deleteNote = req.body;
  
    // If all the required properties are present
    if (noteTitle && noteText) {
      // Variable for the object we will save
      const newNote = {
        review_id: notesData(),
      };
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.json(response);
    } else {
      res.json('Error in deleting notes');
    }
  });

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
