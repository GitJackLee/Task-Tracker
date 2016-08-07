var title = true;

$("#save").on("click", saveTime);
$("ul").on("click", ".deleteTask", removeTask);

//Change task name
$("#taskNameAndInput").on("click", "#taskName", function(){
  var placeholder = $("#taskName").text();
  var taskInput = '<input id="taskInput" type="text" placeholder="' + placeholder + '"><button id="cancel">Cancel</button>';
  if(title && !isOn){
    $("#taskName").replaceWith(taskInput);
    title = false;
  }
});

//Input task
$("#taskNameAndInput").on("keypress", "#taskInput", function(event){
  var value = $(this).val();
  if(!title && event.which === 13 && value.length !== 0 && !isOn) {
    var taskName = "<h1 id='taskName'>" + value + "</h1>";
    $("#taskInput").replaceWith(taskName);
    $("#cancel").remove();
    title = true;
  }
});

//Cancel task
$("#taskNameAndInput").on("click", "#cancel", function(){
  var originalText = $("#taskInput").attr("placeholder");
  $("#taskInput").replaceWith("<h1 id='taskName'>" + originalText + "</h1>");
  $("#cancel").remove();
  title = true;
});

function removeTask(event){
  $(this).parent().fadeOut(500, function(){
    $(this).remove();
  });
  event.stopPropagation();
}

function saveTime(){
  var taskValue = $("#taskName").text();
  var timerValue = formatTime(currentTime);
  if(title && !isOn){
    $("#taskList").append("<li class='taskItems'><span class='deleteTask'>X</span> " + taskValue + " <span class='stopWatchTime'>" + timerValue + "</span><button class='continueTask'>Continue</button></li>");
  }
}

function continueTask() {
  $.fn.ignore = function(sel){
    return this.clone().find(sel||">*").remove().end();
  }
  var task = $(this).parent().ignore("button, span").text();
  var stopWatchTime = $(this).prev().text();

  var convertTime = function taskTime(msToConvert){
    var time = stopWatchTime;
    var noLetters = /[a-z]/g;
    time = time.replace(noLetters, "").split(" ");
    var seconds = (time[0]) * 60 * 60 + (+time[1]) * 60 + (+time[2]) + (+time[3]) / 1000;
    var milliseconds = seconds * 1000;
    currentTime = milliseconds;
    return formatTime(milliseconds);
  };

  $("#taskName").replaceWith("<h1 id='taskName'>" + task + "</h1>");
  $("#timer").replaceWith("<h1 id='timer'>" +  convertTime(stopWatchTime) + "</h1>");
}

$("ul").on("click", "button", continueTask);
