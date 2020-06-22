// Dependencies
const express = require("express");
const fs = require("fs");

// Express App
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extend: true }));
app.use(express.json());


// Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});