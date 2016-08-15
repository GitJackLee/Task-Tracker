var mongoose = require("mongoose");
var Task = require("./models/tasks");

var data = [
  {
    task: "Codewars",
    timer: "00h 00m 00s 000ms"
  },
  {
    task: "FreeCodeCamp",
    timer: "01h 10m 30s 000ms"
  },
  {
    task: "Pluralsight",
    timer: "10h 50m 20s 500ms"
  },
  {
    task: "Udacity",
    timer: "23h 20m 33s 723ms"
  },
  {
    task: "Udemy",
    timer: "04h 18m 44s 123ms"
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
