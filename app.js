var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Task = require("./models/tasks.js");
var seedDB = require("./seeds.js");

//APP CONFIGURATION
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/task_tracker");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
seedDB();

app.get("/", function(req, res){
  //Get all tasks from DB
  Task.find({}, function(err, tasks){
    if(err){
      console.log(err);
    } else{
      res.render("index", {tasks: tasks});
    }
  });
});

app.post("/", function(req, res){
  console.log(req.body.task);
  res.redirect("/");
});


app.listen(3000, function(){
  console.log("Server Started");
});
