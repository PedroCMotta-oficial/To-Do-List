const express = require('express');
const db = require('./db');

const router = express.Router();


/*
        MÉTODOS PARA LISTAS
*/
router.get('/', (req, res) => { // mostrar listas
  db.query('SELECT * FROM lists', (err, results) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    res.json(results);
  })
})
router.post('/', (req, res) => { // criação de listas
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


console.log('API conectada!');

module.exports = router;