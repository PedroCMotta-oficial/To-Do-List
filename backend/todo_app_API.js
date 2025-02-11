const express = require('express');
const db = require('./db');

const router = express.Router();

router.post('/', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO lists (name) VALUES (?)';

  db.query(sql, [name], (err, result) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    res.status(201).json({id: result.insertId, name});
  })
})

router.get('/', (req, res) => {
  db.query('SELECT * FROM lists', (err, results) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    res.json(results);
  })
})

console.log('API conectada!');

module.exports = router;