const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_funcionarios'
};

const db = mysql.createPool(dbConfig);

// GET /api/funcionarios
app.get('/api/funcionarios', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM funcionarios ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/funcionarios/:id
app.get('/api/funcionarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.execute('SELECT * FROM funcionarios WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Funcionário não encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/funcionarios
app.post('/api/funcionarios', async (req, res) => {
    try {
        const { nome, funcao, salario } = req.body;
        if (!nome || !funcao || !salario) {
            return res.status(400).json({ error: 'Campos obrigatórios' });
        }
        const [result] = await db.execute(
            'INSERT INTO funcionarios (nome, funcao, salario) VALUES (?, ?, ?)',
            [nome, funcao, parseFloat(salario)]
        );
        res.json({ success: true, id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/funcionarios/:id
app.put('/api/funcionarios/:id', async (req, res) => {
    try {
        const { nome, funcao, salario } = req.body;
        const id = req.params.id;
        await db.execute(
            'UPDATE funcionarios SET nome = ?, funcao = ?, salario = ? WHERE id = ?',
            [nome, funcao, parseFloat(salario), id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/funcionarios/:id
app.delete('/api/funcionarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await db.execute('DELETE FROM funcionarios WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/cadastro', async (req, res) => {
    try {
        const { email, senha } = req.body;

        const [usuario] = await db.execute(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        if (usuario.length > 0) {
            return res.status(400).json({
                error: 'Email já cadastrado'
            });
        }

        await db.execute(
            'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
            [email, senha]
        );

        res.json({ success: true });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {

        const { email, senha } = req.body;

        const [usuario] = await db.execute(
            'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
            [email, senha]
        );

        if (usuario.length === 0) {
            return res.status(401).json({
                error: 'Email ou senha inválidos'
            });
        }

        res.json({
            success: true,
            usuario: usuario[0]
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Endpoints: /api/funcionarios (GET/POST/PUT/:id/DELETE/:id)');
});