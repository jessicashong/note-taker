const express = require("express");
const path = require("path");
const noteRouter = express.Router();
const fs = require("fs");
const util = require('util');
const uuid = require("uuid");


// TA assisted
const readAsync = util.promisify(fs.readFile);

//GET request to get notes
noteRouter.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
});

//POST request to add new note
noteRouter.post("/notes", (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid.v4(),
        };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);

            fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) =>
                err ? console.error(err) : console.info("Successfully saved note")
        );
        }
    });

    const response = {
        status: "success",
        body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
    } else {
        res.status(500).json("Error in posting note");
    }
});

//try to get note id to view or delete----activity 18/20
// GET a single review
// noteRouter.get("/notes/:note_id", (req, res) => {
//     const noteId = req.params.note_id;
//     readAsync('./db/db.json')
//         .then((data) => JSON.parse(data))
//         .then((json) => {
//             const result = json.filter((note) => note.note_id === noteId);
//             return result.length > 0
//                 ? res.json(result)
//                 : res.json('Note ID does not exist')
//         });
// });

//DELETE request to remove note
noteRouter.delete('/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readAsync('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id !== noteId);
            fs.writeFileSync('./db/db.json', JSON.stringify(result), (err) => 
                err ? console.error(err)
                    : console.info('note deleted')
            )
            res.json(result)
        });
});

module.exports = noteRouter