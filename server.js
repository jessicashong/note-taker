const express = require("express");

const indexRouter = require('./develop/routes/indexRoute');
const noteRouter = require("./develop/routes/noteRoute");

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//GET request to view notes.html page
app.use('/api', noteRouter)
app.use('/', indexRouter);






// console.log(`Here is a test v4 uuid: ${uuid.v4()}`);

// app.delete('/api/notes:id', (req, res) => {

// })

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
