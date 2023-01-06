const express = require("express");
const path = require("path");
const indexRouter = express.Router();

indexRouter.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/notes.html"))
);

indexRouter.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "./public/index.html"))
);


module.exports = indexRouter