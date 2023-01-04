const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, './public/notes.html'))
);
// app.get('*', (req, res) => 
//     res.sendFile(path.join(__dirname, './public/index.html'))
// );
app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if(title && text) {
        const newNote = {
            title,
            text,
        };
        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(reponse);
        res.status(201).json(response);
    } else{
        res.status(500).json('Error in posting note');
    }
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);




// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// event listeners for save icon and delete icons ----> save by adding info to db.json activity 19
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column