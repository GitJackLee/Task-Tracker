var title = true;

$("#save").on("click", saveTime);
$("ul").on("click", "span", removeTask);

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
  var timerValue = $("#timer").text();
  if(title){
    $("#taskList").append("<li class='taskItems'><span class='deleteTask'>X</span> " + taskValue + "<span class='stopWatchTime'> -- " + timerValue + "</span></li>");
  }
}

/*
- Fixes
  - When the timer is running, the user cannot update the task name.

- Changes
  - Change the h1 to a text box area.
    - When enter is pressed, the text box disappears and in its place, the h1 with the title appears.
    - When the user clicks on any part of the h1 element, the text box will appear so the user can change the title if needed.
    - The text box will have the previous content within the text area.

- Features to add
  - Make a button on the right of each task under the ul. This button will be used to continue the corresponding task.
    - When the continue button is clicked, the h1 will appear with the appropriate title, and the timer will be set to the saved time.
    - When the save button is clicked, the task will overwrite the previous content.
*/
