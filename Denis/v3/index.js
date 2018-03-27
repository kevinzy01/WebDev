const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var app = express();

mongoose.connect("mongodb://localhost/djdenis")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
var db = mongoose.createConnection("localhost", "3000");
db.on("error", console.error.bind(console, "connection error"));

app.set("view engine", "ejs");

// INDEX -- Home
app.get("/", function (req, res) {
  res.render("home")
})

// Schema setup
var songSchema = new mongoose.Schema({
  titulo: String,
  img: String,
  author: String,
  comments: [{body: String, date: Date}],
  date: {type: Date, default: Date.now},
  meta: {
    votes: Number,
    favs: Number
  }
});

var Song = mongoose.model("song", songSchema);

Song.create({
  titulo: "Test",
  img: "Test",
  author: "Denis"
})

// INDEX -- show songs
app.get("/canciones", function (req, res) {
  Song.find({}, function (err, songs) {
    if (err) {
      console.log(err);
    } else {
      res.render("canciones", {songs: songs})
    }
  })
})

app.get("/canciones/", function (req, res) {
  res.render("canciones")
})

// NEW -- add new songs
app.get("/canciones/nueva/cancion", function (req, res) {
  res.render("new.ejs")
})

// CREATE -- add new song to index
app.post("/canciones", function (req, res) {
  // create song and add it to db
  Song.create(req.body.song, function (err, newSong) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/canciones");
    }
  })
})

// SHOW -- Show songs

app.listen("3000", function () {
  console.log("Server Started");
})
