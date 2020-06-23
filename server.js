// Dependencies
var express = require("express");
var path = require("path")
var fs = require("fs");

// Express App
var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extend: true }));
app.use(express.json());

app.use(express.static('public'));

// Routes

// Main Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Notes Page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// API
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
    });
});

//Post
app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        let noteData = JSON.parse(data);
        console.log(noteData);

        let newNote = req.body;
        console.log(newNote);



        noteData.push(newNote);


        fs.writeFile("./db/db.json", JSON.stringify(json, null, 2), function (err) {
            if (err) throw err;
            res.send('200');
        })
    });
});

// Save

// Delete

// Start our server
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});