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
document.addEventListener('click', function(e) {
  if(e.target.tagName === "H2") {
    const listHeader = e.target;
    editTitle(listHeader);
  }
})
function editTitle(listHeader) {
  const currentTitle = listHeader.textContent;
  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.placeholder = currentTitle;

  listHeader.replaceWith(textInput);
  textInput.focus();

  textInput.addEventListener('blur', () => {saveTitle(textInput)} )
  textInput.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {saveTitle(textInput)}
  })
}
function saveTitle(textInput) {
  const newTitle = textInput.value || 'Untitled';
  const newHeader = document.createElement('h2');
  
  newHeader.classList.add('listHeader');
  newHeader.textContent = newTitle;
  textInput.replaceWith(newHeader);

  saveData();
}


// lists deleter
function deleteList(button) {
  const targetList = button.closest('.list');
  targetList.remove();

  // masonry update
  masonryInstance.reloadItems();
  masonryInstance.layout();

  saveData();
}


// lists pinner
function pinList(button) {
  const targetList = button.closest('.list');
  const listsContainer = document.getElementById('lists-container');
  const pinnedList = targetList.classList.contains('pinned');
  if(!pinnedList) {
    listsContainer.insertBefore(targetList, listsContainer.firstChild);
    targetList.classList.add('pinned');
    button.classList.add('active');
  } else {
    targetList.classList.remove('pinned');
    button.classList.remove('active');
    updateList();
  }

  // masonry update
  masonryInstance.reloadItems();
  masonryInstance.layout();

  saveData();
}


// lists container organizator
function updateList() {
  const listsContainer = document.getElementById('lists-container');
  const pinnedLists = Array.from(listsContainer.querySelectorAll('.list.pinned'));

  pinnedLists.forEach(list => {
    listsContainer.prepend(list);
  })
  
  // masonry update
  masonryInstance.reloadItems();
  masonryInstance.layout();
}


function saveData() {
  localStorage.setItem("data", listsContainer.innerHTML);
}
function showTask() {
  listsContainer.innerHTML = localStorage.getItem("data");
  
  // layout calc with timeout adjustments
  setTimeout(function() {
    masonryInstance.reloadItems();
    masonryInstance.layout();
  }, 200)
}
showTask();