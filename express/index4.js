const express = require('express');
const app = express();
// Configura o mecanismo de visualização como EJS
app.set('view engine', 'ejs');
// Define o diretório onde os arquivos .ejs estão localizados
app.set('views', './views');
// Rota GET para /exemplo
app.get('/exemplo', (req, res) => {
const dados = [
{ nome: "Carlos", idade: 45 },
{ nome: "Joana", idade: 36 }
];
// Renderiza o arquivo views/exemplo.ejs e envia os dados
res.render('exemplo', { pessoas: dados });
});
// Inicia o servidor na porta 3000
app.listen(3000, () => {
console.log('Servidor rodando em http://localhost:3000');
});