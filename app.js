var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//APP CONFIGURATION
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/task_tracker");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var taskSchema = new mongoose.Schema({
  name: String,
  timer: Number
});

var Task = mongoose.model("Task", taskSchema);

// var todo = new Task({
//   name: "Codewars",
//   timer: 1470580179289,
// });

// todo.save(function(err, theTodo){
//   if(err){
//     console.log("There was an error: ");
//     console.log(err);
//   } else {
//     console.log(theTodo);
//   }
// });

app.get("/", function(req, res){
  //Get all tasks from DB
  Task.find({}, function(err, tasks){
    if(err){
      console.log(err);
    } else{
      res.render("index", {tasks: tasks});
    }
  })
})

app.listen(3000, function(){
  console.log("Server Started");
});
