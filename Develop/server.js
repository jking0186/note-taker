// Dependencies
var express = require("express");
var path = require("path")
var fs = require("fs");

// Express App
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extend: true }));
app.use(express.json());

app.use(express.static('public'));




// Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
    });
});

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

        fs.writeFile("./db/db.json", process.argv[2], function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");
        })
        res.json(newData);
    });
})
// Start our server
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});