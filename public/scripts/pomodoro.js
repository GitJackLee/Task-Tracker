var pomodoroCurrentTime = 1500000;
var isOn = false;
var isBreak = false;
var breakTimer = false;
var interval;
var offset;
var alarm = new Audio("https://www.youtube.com/audiolibrary_download?vid=13321fdd50ae3ee6");
var increment = document.getElementById("increment");
var decrement = document.getElementById("decrement");
var taskName = document.getElementById("taskName");

increment.addEventListener("click", pomodoroIncrementTime);
decrement.addEventListener("click", pomodoroDecrementTime);

window.onload = function() {
  timer.textContent = formatTime(pomodoroCurrentTime);
}

//This is run first
function startClock(){
  if(breakTimer){
    interval = setInterval(breakUpdate, 10);
    offset = Date.now();
    isOn = true;
  } else if(!isOn){
    interval = setInterval(pomodoroUpdate, 10);
    offset = Date.now();
    isOn = true;
  }
}

//This is run second
function delta(){
  var now = Date.now();
  var timePassed = now - offset;
  offset = now;
  return timePassed;
}

function breakTime(){
  if(isBreak){
    clearInterval(interval);
    pomodoroCurrentTime = 300000;
    taskName.textContent = "Time for a break!";
    timer.textContent = formatTime(pomodoroCurrentTime);
    isBreak = false;
    breakTimer = true;
  }
}

//This is run third
function pomodoroUpdate(){
  if(pomodoroCurrentTime <= 0){
    alarm.play();
    isBreak = true;
    isOn = false;
    breakTime();
  } else if(isOn){
    pomodoroCurrentTime -= delta();
  }
  timer.textContent = formatTime(pomodoroCurrentTime);
}

function breakUpdate(){
  if(pomodoroCurrentTime <= 0){
    alarm.play();
    isOn = false;
    breakTimer = false;
    clearInterval(interval);
    pomodoroCurrentTime = 1500000;
    taskName.textContent = pomodoroTask.value;
  }
  if(isOn){
    pomodoroCurrentTime -= delta();
  }
  timer.textContent = formatTime(pomodoroCurrentTime);
}

//This is run forth
function formatTime(milliseconds){
  var time = new Date(milliseconds);
  var minutes = time.getMinutes().toString();
  var seconds = time.getSeconds().toString();

  if(minutes.length < 2){
    minutes = "0" + minutes;
  }

  if(seconds.length < 2){
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}

//This is run only when stop button is pressed
function stopClock(){
  if(isOn){
    clearInterval(interval);
    isOn = false;
  }
}

//This is run only when reset button is pressed
function resetClock(){
  if(!isOn){
    pomodoroCurrentTime = 1500000;
    taskName.textContent = pomodoroTask.value;
    pomodoroUpdate();
  }
}

function pomodoroIncrementTime(){
  pomodoroCurrentTime += 60000
  timer.textContent = formatTime(pomodoroCurrentTime);
}

function pomodoroDecrementTime(){
  pomodoroCurrentTime -= 60000;
  timer.textContent = formatTime(pomodoroCurrentTime);
  if(pomodoroCurrentTime <= 0){
    timer.textContent = "00:00";
  }
}
