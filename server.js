//requiring express, fs, path
const express = require("express");
const fs = require("fs");
const path = require("path");

//claiming the port
const PORT = 3001;

//claiming app as express
const app = express();

//encodng something just not sure what
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//calling the static files public \
app.use(express.static("public"));
const notesArr = JSON.parse(fs.readFileSync("./db/db.json"));
console.log(typeof notesArr);

//joining the path/route of notes to public notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//creating the api to get all the entries
app.get("/api/notes", (req, res) => {
  return res.json(notesArr);
});

//getting all the notes written and oushing them to the db.json file
app.post("/api/notes", (req, res) => {
  const note = req.body;
  notesArr.push(note);
  fs.writeFileSync("./db/db.json", JSON.stringify(notesArr));
  res.send();
});

//joining the html to the server 
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//creatting a port and where to listen 
app.listen(PORT, () =>
  console.log("app be listenin on http://localhost:${PORT}")
);
