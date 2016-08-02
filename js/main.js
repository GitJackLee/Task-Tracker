var timer = document.getElementById("timer");
var start = document.getElementById("start");
var stop = document.getElementById("stop");
var reset = document.getElementById("reset");
var save = document.getElementById("save");

start.addEventListener("click", startClock);
stop.addEventListener("click", stopClock);
reset.addEventListener("click", resetClock);
