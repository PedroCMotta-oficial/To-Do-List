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


// Lists title changer
/*
document.addEventListener('click', function(e) {
  if(e.target && e.target.matches('.listHeader')) {
    const header = e.target;
    editTitle(header);
  }
});
function editTitle(header) {
  // input creation
  const currentTitle = header.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentTitle;
  input.classList.add('header-input');

  header.replaceWith(input);
  input.focus();

  input.addEventListener('blur', () => saveTitle(input));
  input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') saveTitle(input);
  });
}
function saveTitle(input) {
  const newTitle = input.value.trim() || 'Untitled';
  const header = document.createElement('h2');
  header.classList.add('listHeader');
  header.textContent = newTitle;

  input.replaceWith(header);
}
*/
/*
document.getElementById("#listHeader").addEventListener("click", function() {
  // input creation
  const currentText = this.innerHTML;
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;

  // old title to input transition
  this.innerHTML = "";
  this.appendChild(input);
  input.focus();

  // title changing
  input.addEventListener("blur", function() {
    const newTitle = input.value;
    this.parentElement.innerHTML = newTitle;
  })
  input.addEventListener("keydown", function(e) {
    if(e.key === "Enter") {
      const newTitle = input.value;
      this.parentElement.innerHTML = newTitle;
    }
  })
})
*/


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