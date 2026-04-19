const express = required('express');
const app = express();

app.use(express.urlencoded({ extended: true}));
let tarefas = [
    { tarefa: "compilar" },
    { tarefa: "testar" }
];

const getPagina = () => {
    let conteudo = "<html><body>";
    conteudo += "<form method ='post' >";
    conteudo += "<input type= 'text' name= 'tarefa' placeholder= 'Tarefa'>";
    conteudo += "input type= 'submit' value='Adicionar'>";

    conteudo += "<ul>";
    for (let t of tarefas) {

    conteudo += `<li>${t.tarefa}</li>`;
    }
    conteudo += "</ul>";

    conteudo += "</body></html>";
    return conteudo;
};

app.get(['/', '/web/tarefas'], (req, res) => {
    res.status(200)
    .contentType('text/html')
    .send(getPagina());
});

app.post(['/', '/web/tarefas'], (req, res) => {
    if (req.body.tarefa && req.body.tarefa.trim() !== "")
        tarefas.push( { tarefa: req.body.tarefa.trim() });

res.status(200)
.contentType("text/html")
.send(getPagina());

});

app.listen(3000, () => {
    console.log('Servidor rodando em https://localhost:3000')
});