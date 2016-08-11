var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
  task: String,
  timer: Number
});

module.exports = mongoose.model("Task", taskSchema);
