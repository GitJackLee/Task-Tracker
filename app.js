var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var mongoose = require("mongoose");
var Task = require("./models/tasks.js");
var flash = require("connect-flash");
var seedDB = require("./seeds.js");

//APP CONFIGURATION
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/task_tracker");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());
seedDB();

app.get("/", function(req, res){
  res.redirect("/tasks");
});

//INDEX -- SHOW ALL TASKS
app.get("/tasks", function(req, res){
  //Get all tasks from DB
  Task.find({}, function(err, tasks){
    if(err){
      console.log(err);
    } else{
      res.render("index", {tasks: tasks});
    }
  });
});

//NEW -- FORM FOR NEW TASK
app.get("/tasks/new", function(req, res){
  res.render("new");
});

// CREATE -- WITHIN /TASKS/NEW, CREATE TASK
app.post("/tasks", function(req, res){
  // req.body.task.task = req.sanitize(req.body.task.task);
    Task.create(req.body.task, function(err, newTask){
    if(err){
      console.log("Error on CREATE ROUTE");
    } else {
      // console.log(req);
      console.log(newTask);
      res.redirect("/tasks");
    }
  });
});

//SHOW -- SHOW ONLY ONE TASK
app.get("/tasks/:id", function(req, res){
  Task.findById(req.params.id, function(err, foundTask){
    if(err){
      console.log(err);
    } else {
      res.render("show", {task: foundTask});
    }
  });
});

//EDIT -- EDIT ONE TASK ONLY
app.get("/tasks/:id/edit", function(req, res){
  Task.findById(req.params.id, function(err, foundTask){
    if(err){
      console.log("Error on edit route");
    } else {
      res.render("edit", {task: foundTask});
    }
  });
});

//UPDATE -- ON EDIT PAGE, BUTTON UPDATES AND REDIRECTS TO INDEX
app.put("/tasks/:id", function(req, res){
  Task.findByIdAndUpdate(req.params.id, req.body.task, function(err, updatedTask){
    if(err){
      console.log("Error on put route");
      res.redirect("/tasks");
    } else {
      console.log(updatedTask);
      res.redirect("/tasks/" + req.params.id);
    }
  });
});

//DELETE -- ON SHOW PAGE (AND MAYBE INDEX), BUTTON TO DELETE AND REDIRECT TO INDEX
app.delete("/tasks/:id", function(req, res){
  Task.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log("Error on delete route");
      res.redirect("/tasks");
    } else {
      console.log("Delete successful");
      res.redirect("/tasks");
    }
  });
});

app.listen(3000, function(){
  console.log("Server Started");
});
