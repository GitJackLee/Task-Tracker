var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//APP CONFIGURATION
mongoose.connect("mongodb://localhost/task_tracker");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("index");
})

app.listen(3000, function(){
  console.log("Server Started");
});
