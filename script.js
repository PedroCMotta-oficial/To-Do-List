// para botão de criação de tarefas
const inputBox = document.getElementById("input-box");
const tasksContainer = document.getElementById("tasks-container");

// para botão de criação de listas
const listsContainer = document.getElementById("lists-container");
const listToBeCloned = document.getElementById("listBeta");

function addTask() {
  if(inputBox.value === '') {
    alert("You must write something!");
  } else {
    // creation of the task
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    tasksContainer.appendChild(li);

    // making a delete way to the task that was created before
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

function addList() {
  let newList = listToBeCloned.cloneNode(true);
  newList.removeAttribute('id');
  listsContainer.appendChild(newList);
  saveData();
}


// checagem de tarefas
tasksContainer.addEventListener("click", function(e) {
  if(e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if(e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false)


function saveData() {
  localStorage.setItem("data", tasksContainer.innerHTML);
}
function showTask() {
  tasksContainer.innerHTML = localStorage.getItem("data");
}
showTask();