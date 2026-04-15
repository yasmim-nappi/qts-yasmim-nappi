const express = require('express');
const app = express();

port = 3000;

app.get('/', (req, res) => {
    res.json({mensagem: 'Olá Mundo!'});
});

app.listen(3000, () => { console.log('Servidor rodando em http://localhost:3000');});