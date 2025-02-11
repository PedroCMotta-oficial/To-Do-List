const express = require('express');
const cors = require('cors');
const app = express();
const port = 9000;
const db = require('./db');

app.use(cors())

app.get('/', (req, res) => {
  res.send('Backend está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em https://localhost:${port}`);
});