const express = require('express');
app = express();

let tarefas = [
    { tarefa: 'compilar'},
    { tarefa: 'testar'}
];

app.get(['/', 'tarefas'], (req, res) => {
    let conteudo ="<html><body><ul>";

    for (let t of tarefas) {
        conteudo += `<li>${t.tarefa}</li>`;
    }

    conteudo += "</ul></body></html>";

res.status(200)
    .contentType('text/html')
    .send(conteudo);
});

app.listen(3000, () => { console.log('Servidor rodando em http://localhost:3000');});