const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Backend está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em https://localhost:${port}`);
});