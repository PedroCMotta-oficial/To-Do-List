const API_URL_LISTS = 'http://localhost:9000/api/lists';
const API_URL_TASKS = 'http://localhost:9000/api/tasks';

/*
    FUNÇÕES PARA LISTAS
*/
// GET
export async function getListsAPI() {
  const response = await fetch(API_URL_LISTS);
  return response.json();
}
// ADD
export async function addListAPI(newList) {
  const response = await fetch(API_URL_LISTS, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: newList})
  });
  return response.json();
}
// NAME CHANGE
export async function changeListNameAPI(id, newName) {
  const response = await fetch(`${API_URL_LISTS}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: newName})
  });
  return response.json();
}
// PIN TOGGLE
export async function toggleListPinAPI(id) {
  const response = await fetch(`${API_URL_LISTS}/${id}/toggle-pinned`, {method: 'PATCH',});
  return response.json();
}
// DELETE
export async function deleteListAPI(id) {
  const response = await fetch(`${API_URL_LISTS}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
}



/*
    FUNÇÕES PARA TAREFAS
*/
// GET
export async function getTasksAPI() {
  const response = await fetch(API_URL_TASKS);
  return response.json();
}
// ADD
export async function addTaskAPI(newTask, list_id) {
  const response = await fetch(API_URL_TASKS, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: newTask, list_id: list_id})
  });
  return response.json();
}
// NAME CHANGE
export async function changeTaskNameAPI(id, newTitle) {
  const response = await fetch(`${API_URL_TASKS}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: newTitle})
  });
  return response.json();
}
// COMPLETED TOGGLE
export async function toggleTaskCompleteAPI(id) {
  const response = await fetch(`${API_URL_TASKS}/${id}/toggle-complete`, {method: 'PATCH',});
  return response.json();
}
// DELETE
export async function deleteTaskAPI(id) {
  const response = await fetch(`${API_URL_TASKS}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
}