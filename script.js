// masonry library initialization
let masonryInstance;
document.addEventListener('DOMContentLoaded', function () {
  masonryInstance = new Masonry('#lists-container', {
    itemSelector: '.list',
    columnWidth: 500,
    gutter: 25,
    fitWidth: true,
  });
});


// variables made to list creation
let listsCounter = 0;
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

    // deleting way to the task
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";

  // masonry update
  masonryInstance.reloadItems();
  masonryInstance.layout();

  saveData();
}


function addList() {
  listsCounter++;
  let newList = listToBeCloned.cloneNode(true);
  newList.removeAttribute('id');
  newList.setAttribute('data-id', `list-${listsCounter}`);
  listsContainer.appendChild(newList);

  // masonry update
  masonryInstance.reloadItems();
  masonryInstance.layout();

  saveData();
}


// task checking
document.addEventListener("click", function(e) {
  if(e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if(e.target.tagName === "SPAN") {
    e.target.parentElement.remove();

    // masonry update
    masonryInstance.reloadItems();
    masonryInstance.layout();

    saveData();
  }
}, false)


function saveData() {
  localStorage.setItem("data", listsContainer.innerHTML);
}
function showTask() {
  listsContainer.innerHTML = localStorage.getItem("data");
  
  // layout calc with timeout adjustments
  setTimeout(function() {
    masonryInstance.reloadItems();
    masonryInstance.layout();
  }, 100)
}
showTask();