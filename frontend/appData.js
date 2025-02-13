import {getLists, getTasks} from './API_connector';

async function fetchData() {
  // catch all lists
  const LResponse = getLists();
  const lists = await LResponse.json();

  // catch all tasks
  const TResponse = getTasks();
  const tasks = await TResponse.json();

  // list-tasks association
  const listsWithTasks = lists.map(list => ({
    ...lists,
    tasks: tasks.filter(task => task.list_id === list.id),
  }));

  renderLists(listsWithTasks);

  function renderLists(lists) {
    listsContainer.innerHTML = '';

    lists.foreach(list => {
      const listElement = document.createElement('div');
      listElement.classList.add('list');
      listElement.dataset.id = list.id;

      listElement.innerHTML = `
        <div class="listMenu">
          <h2 class="listHeader">${list.name}</h2>
          <div class="menuButtons">
            <button class="listPinner" onclick="pinList(this)"></button>
            <button class="listDeleter" onclick="deleteList(this)"></button>
          </div>
        </div>

        <div class="creator">
          <input type="text" class="input-box" placeholder="Add a task">
          <button onclick="addTask(this)">Add</button>
        </div>

        <ul class="tasks-container">
          ${list.tasks.map(task => `
            <li>
              <span class="checkmark" onclick="toggleCheck(this)"></span>
              <span class="taskText" onclick="editTask(this)">${task.name}</span>
              <span class="deleteButton" onclick="deleteTask(this)"></span>
            </li>`).join("")}
        </ul>
      `;

      listsContainer.appendChild(listElement);
    });
  }
}

export {fetchData};
