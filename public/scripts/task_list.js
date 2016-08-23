var pomodoroTask = document.getElementById("pomodoroTask");

pomodoroTask.addEventListener("keypress", changeTask, false);

function changeTask(event){
  if(event.which === 13){
    taskName.textContent = pomodoroTask.value;
  }
}
