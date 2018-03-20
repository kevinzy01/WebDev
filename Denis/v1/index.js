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

app.get("/", function (req, res) {
  res.render("home")
})

app.get("/canciones", function (req, res) {
  res.render("canciones")
})

app.listen("3000", function () {
  console.log("Server Started");
})
