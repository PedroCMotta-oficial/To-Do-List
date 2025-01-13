let listsCounter = 0;

// para botão de criação de listas
const listsContainer = document.getElementById("lists-container");
const listToBeCloned = document.getElementById("listBeta");

function addTask(button) {
  const targetList = button.closest('.list');
  const inputBox = targetList.querySelector('#input-box');
  const tasksContainer = targetList.querySelector('#tasks-container');


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
  listsCounter++;
  let newList = listToBeCloned.cloneNode(true);
  newList.removeAttribute('id');
  newList.setAttribute('data-id', `list-${listsCounter}`);
  listsContainer.appendChild(newList);
  saveData();
}


// checagem de tarefas
document.addEventListener("click", function(e) {
  if(e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if(e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false)


function saveData() {
  localStorage.setItem("data", listsContainer.innerHTML);
}
function showTask() {
  listsContainer.innerHTML = localStorage.getItem("data");
}
showTask();