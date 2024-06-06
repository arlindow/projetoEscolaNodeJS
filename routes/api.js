const express = require('express');
const bodyParser = require('body-parser');
const alunoService = require('./services/alunoService');

const app = express();
app.use(bodyParser.json());

app.get('/api/alunos', async (req, res) => {
    const alunos = await alunoService.getAllAlunos();
    res.json(alunos);
});

app.post('/api/alunos', async (req, res) => {
    const aluno = req.body;
    await alunoService.insertAluno(aluno);
    res.status(201).json({ message: 'Aluno inserido com sucesso' });
});

app.put('/api/alunos/:id', async (req, res))
