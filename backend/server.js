const express = require('express');
const cors = require('cors');
const app = express();
const port = 9000;
const db = require('./db');
const appAPI = require('./todo_app_API');

app.use(cors())

app.use(express.json());
app.use('/api', appAPI);

app.listen(port, () => {
  console.log(`Servidor rodando em https://localhost:${port}`);
});