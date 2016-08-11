var mongoose = require("mongoose");
var Task = require("./models/tasks");

var data = [
  {
    task: "Codewars",
    timer: 1470580179289
  },
  {
    task: "FreeCodeCamp",
    timer: 1470883875716
  },
  {
    task: "Pluralsight",
    timer: 1470883929364
  },
  {
    task: "Udacity",
    timer: 1470883952307
  },
  {
    task: "Udemy",
    timer: 1470883977132
  }
]

function seedDB(){
  //Remove all tasks
  Task.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("Tasks removed");
  });
  //Add tasks to be used in the DB
  data.forEach(function(seed){
    Task.create(seed, function(err, task){
      if(err){
        console.log(err);
      } else {
        console.log("Added a task");
      }
    });
  });
}

module.exports = seedDB;
