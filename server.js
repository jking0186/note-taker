// Dependencies
var express = require("express");
var path = require("path")
var fs = require("fs");

// Express App
var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
// Main Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Notes Page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// API
app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (error, data) {
        if (error) throw error;

        let noteData = JSON.parse(data);

        res.json(noteData);
    });
});

//Post
app.post("/api/notes", function (req, res) {

    fs.readFile("db/db.json", "utf8", function (error, data) {
        if (error) throw error;

        let noteData = JSON.parse(data);

        let newNote = req.body;
        console.log(newNote);

        noteData.push(newNote);

        fs.writeFile("db/db.json", JSON.stringify(noteData), function (error) {
            if (error) throw error;

            console.log("Success!")
        })

        res.json(noteData);
    });
});

// Delete

// Start server
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});