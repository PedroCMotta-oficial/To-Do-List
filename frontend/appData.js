import {getLists, getTasks} from './API_connector.js';

async function fetchData(listsContainer) {
  // catch all lists
  /*const LResponse = getLists();
  const lists = await LResponse.json();*/
  const lists = await getLists();

  // catch all tasks
  /*const TResponse = getTasks();
  const tasks = await TResponse.json();*/
  const tasks = await getTasks();

  console.log("Lists:", lists);
  console.log("Tasks:", tasks);


  // list-tasks association
  const listsWithTasks = lists.map(list => ({
    ...list,
    tasks: tasks.filter(task => task.list_id === list.id),
  }));

  renderLists(listsWithTasks, listsContainer);

  function renderLists(lists, listsContainer) {
    listsContainer.innerHTML = '';

    lists.forEach(list => {
      const listElement = document.createElement('div');
      listElement.classList.add('list');
      if(list.pinned === 1) {
        listElement.classList.add('pinned');
      }
      listElement.dataset.id = list.id;

      listElement.innerHTML = `
        <div class="listMenu">
          <h2 class="listHeader">${list.name}</h2>
          <div class="menuButtons">
            <button class="listPinner ${list.pinned ? 'active' : ''}" onclick="pinList(this)"></button>
            <button class="listDeleter" onclick="deleteList(this)"></button>
          </div>
        </div>

        <div class="creator">
          <input type="text" class="input-box" placeholder="Add a task">
          <button onclick="addTask(this)">Add</button>
        </div>

        <ul id="tasks-container">
          ${list.tasks.map(task => `
            <li>
              <span class="checkmark ${task.completed ? 'checked' : ''}" onclick="toggleCheck(this)"></span>
              <span class="taskText" onclick="editTask(this)">${task.title}</span>
              <span class="deleteButton" onclick="deleteTask(this)">\u00d7</span>
            </li>`).join("")}
        </ul>
      `;

      listsContainer.appendChild(listElement);

      console.log('HTML gerado:', listElement.innerHTML);

    });
  }
}

export {fetchData};
