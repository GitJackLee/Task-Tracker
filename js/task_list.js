function addTaskTitle(event){
  if(event.which === 13){
    var value  = $(this).val();
    $(this).val("");
    $("#taskTitle").replaceWith("<h1 id='taskTitle'>" + value + "</h1>");
  }
}

function removeTask(event){
  $(this).parent().fadeOut(500, function(){
    $(this).remove();
  });
  event.stopPropagation();
}

function saveTime(){
  var taskValue = $("#taskTitle").text();
  var timerValue = $("#timer").text();
  $("#taskList").append("<li class='taskItems'><span class='deleteTask'>X</span> " + taskValue + "<span class='stopWatchTime'> -- " + timerValue + "</span></li>");
}

$("input[type='text']").keypress(addTaskTitle);
$("#save").on("click", saveTime);
$("ul").on("click", "span", removeTask);
