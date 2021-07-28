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

  // res.json(`${req.method} request received to get notes`);
  res.sendFile(path.join(__dirname, './db/db.json'));
  // Log our request to the terminal
});

function returnId(array) {
  const sortedData = array
    .sort(function (a, b) { return a.id - b.id });

  for (let i = 1; i < sortedData.length; i++) {
    if (sortedData[i - 1].id !== sortedData[i].id - 1) {
      //if there's a gap
      return sortedData[i - 1].id + 1;
    }
  };

  return sortedData[sortedData.length - 1].id + 1
}

app.post('/api/notes', (req, res) => {

  console.info(`${req.method} request received to add notes`);

  // Destructuring assignment for the items in req.body
  let userNote = {title : req.body.title, text: req.body.text};
  console.log(req.body);
  // If all the required properties are present
  if (userNote.title && userNote.text) {

    var d = fs.readFileSync('./db/db.json', function (error) {

    });
    data = JSON.parse(d);
    console.log(data);
    if (data[0]) {
      userNote.id = returnId(data);
    }else {
      userNote.id = 0
    }
    data.push(userNote);

    let stringData = JSON.stringify(data);
    fs.writeFile(path.join(__dirname, './db/db.json'), stringData, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Success!");
    });
  }

  res.redirect('/');
});

app.delete('/api/notes/:id', (req, res) => {

  console.info(`${req.method.id} request received to delete notes`);
  
  // Destructuring assignment for the items in req.body
  const deleteNote = req.params.id;
  var d = fs.readFileSync('./db/db.json', function (error) {

  });
  let data = JSON.parse(d);
  let deleteNoteId;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == deleteNote){
      deleteNoteId = i;
      console.log(data[i]);
    }
  }
  console.log(deleteNoteId);
  data.splice(deleteNoteId, 1)

  console.log(data);

  let stringData = JSON.stringify(data);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), stringData, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Success!");
    });
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
