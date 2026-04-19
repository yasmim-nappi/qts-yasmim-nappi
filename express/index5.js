const express = require('express');
const app = express();
// Define a porta onde o servidor irá rodar
const port = 3000;
// Define o mecanismo de visualização como EJS
app.set('view engine', 'ejs');
// Define o diretório onde as views (arquivos .ejs) estão localizadas
app.set('views', './views');
// Middleware para interpretar dados de formulário enviados via POST
app.use(express.urlencoded({ extended: true }));
// Lista inicial de contatos
let contatos = [
{ nome: "XPTO", email: "xpto@xpto.com" }
];
// Rota GET para exibir os contatos
app.get('/contatos', (req, res) => {
// Se houver parâmetro delId na URL, remove o contato correspondente
if (req.query.delId) {
contatos.splice(req.query.delId, 1);
}
// Renderiza a view 'contatos.ejs' passando a lista de contatos
res.render('contatos', { contatos: contatos });
});
// Rota POST para adicionar um novo contato
app.post('/contatos', (req, res) => {
// Adiciona um novo contato com os dados enviados pelo formulário
contatos.push({
nome: req.body.n1,
email: req.body.e1
});
// Renderiza a view novamente com a lista atualizada
res.render('contatos', { contatos: contatos });
});
// Inicia o servidor e escuta na porta definida
app.listen(port, () => {
console.log("Servidor rodando em http://localhost:${port}");
});