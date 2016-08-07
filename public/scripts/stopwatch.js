var currentTime = 0; //used to udpate the stopwatch from where it left off. increments as milliseconds and passed into formatTime
var isOn = false;
var interval;
var offset;

//This is run first
function startClock(){
  if(!isOn && title){
    interval = setInterval(update, 10);
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

//This is run third
function update(){
  if(isOn){
    currentTime += delta();
  }
  $("#timer").text(formatTime(currentTime));
}

//This is run forth
function formatTime(milliseconds){
  var time = new Date(milliseconds);
  var hours = time.getUTCHours().toString();
  var minutes = time.getMinutes().toString();
  var seconds = time.getSeconds().toString();
  var milliseconds = time.getMilliseconds().toString();

  if(hours.length < 2){
    hours = "0" + hours;
  }

  if(minutes.length < 2){
    minutes = "0" + minutes;
  }

  if(seconds.length < 2){
    seconds = "0" + seconds;
  }

  while(milliseconds.length < 3){
    milliseconds = "0" + milliseconds;
  }

  return hours + "h " + minutes + "m " + seconds + "s " + milliseconds + "ms";
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
    currentTime = 0;
    update();
  }
}
