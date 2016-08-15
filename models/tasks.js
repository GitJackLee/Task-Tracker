var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
  task: String,
  timer: {type: String, default: "00h 00m 00s 000ms"},
  created: {type: Date, default:  Date.now}
});

module.exports = mongoose.model("Task", taskSchema);
