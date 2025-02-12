const express = require('express');
const db = require('./db');

const router = express.Router();


/*
        MÉTODOS PARA LISTAS
*/
router.get('/lists', (req, res) => { // mostrar listas
  db.query('SELECT * FROM lists', (err, results) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    res.json(results);
  })
})
router.post('/lists', (req, res) => { // criação de listas
  const { name } = req.body;
  const sql = 'INSERT INTO lists (name) VALUES (?)';

  db.query(sql, [name], (err, result) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    res.status(201).json({id: result.insertId, name});
  })
})
router.put('/lists/:id', (req, res) => { // modificação do nome da lista
  const {id} = req.params;
  const {name} = req.body;
  const sql = 'UPDATE lists SET name = ? WHERE id = ?';

  db.query(sql, [name, id], (err, result) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    res.status(200).json({id, name});
  })
})
router.delete('/lists/:id', (req, res) => {
  const {id} = req.params;
  const sql = 'DELETE FROM lists WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    res.status(200).json({message: 'Lista deletada!'});
  })
})



/*
        MÉTODOS PARA TAREFAS
*/
router.get('/tasks', (req, res) => { // mostrar tarefas
  db.query('SELECT * FROM tasks', (err, results) => {
    if(err) {
      return res.status(500).json({error: err.mesage});
    }
    res.json(results);
  })
})
router.post('/tasks', (req, res) => { // criação de uma nova tarefa
  const {list_id, title, completed} = req.body;
  const sql = 'INSERT INTO tasks (list_id, title, completed) VALUES (?, ?, ?)';

  db.query(sql, [list_id, title, completed], (err, result) => {
    if(err) {
      res.status(500).json({error: 'Erro ao criar tarefa'});
    }
    res.status(201).json({message: 'Tarefa cria com sucesso', task: {id: result.insertId, list_id, title, completed}});
  })
})
router.put('/tasks/:id', (req, res) => { // atualização de qualquer dado da tarefa
  const {id} = req.params;
  const {title} = req.body;
  const sql = 'UPDATE tasks SET title = ? WHERE id = ?';

  db.query(sql, [title, id], (err, result) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    res.json({message: 'Tarefa atualizada com sucesso'});
  })
})
router.patch('/tasks/:id/toggle-complete', (req, res) => { // alternar completude da tarefa
  const {id} = req.params;

  db.query('SELECT completed FROM tasks WHERE id = ?', [id], (err, result) => {
    if(err) {
      return res.status(500).json({error: 'Erro ao buscar tarefa!'});
    }
    if(result.length === 0) {
      return res.status(404).json({error: 'Tarefa não encontrada!'});
    }

    const task = result[0];
    const newStatus = !task.completed;
    db.query('UPDATE tasks SET completed = ? WHERE id = ?', [newStatus, id], (err, result) => {
      if(err) {
        return res.status(500).json({error: 'Erro ao alterar status da tarefa!'});
      }
      res.json({message: 'Status da tarefa alterado!', completed: newStatus});
    })
  })
})
router.delete('/tasks/:id', (req, res) => {
  const {id} = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    res.status(200).json({message: 'Lista deletada!'});
  })
})



console.log('API conectada!');

module.exports = router;