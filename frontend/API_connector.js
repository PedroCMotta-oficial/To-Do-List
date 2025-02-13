const API_URL_LISTS = 'http://localhost:9000/api/lists'

/*
    FUNÇÕES PARA LISTAS
*/
// GET
export async function getLists() {
  const response = await fetch(API_URL_LISTS);
  return response.json();
}
// ADD
export async function addList(newList) {
  const response = await fetch(API_URL_LISTS, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nome: newList})
  });
  return response.json();
}
// NAME CHANGE
export async function changeListName(id, newName) {
  const response = await fetch(`${API_URL_LISTS}/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: newName})
  });
  return response.json();
}
// PIN TOGGLE
export async function toggleListPin(id, isPinned) {
  const response = await fetch(`${API_URL_LISTS}/${id}/toggle-pinned`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({pinned: !isPinned})
  });
  return response.json();
}
// DELETE
export async function deleteList(id) {
  const response = await fetch(`${API_URL_LISTS}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
}



/*
    FUNÇÕES PARA TAREFAS
*/
