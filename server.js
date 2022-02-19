const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
const notesArr = JSON.parse(fs.readFileSync("./db/db.json"));
console.log(typeof notesArr);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  return res.json(notesArr);
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  notesArr.push(note);
  fs.writeFileSync("./db/db.json", JSON.stringify(notesArr));
  res.send();
});

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log("app be listenin on http://localhost:${PORT}")
);
