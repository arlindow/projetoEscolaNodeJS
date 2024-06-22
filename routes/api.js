const express = require('express');
const bodyParser = require('body-parser');
const alunoService = require('./services/alunoService');

const app = express();
app.use(bodyParser.json());

app.get('/api/alunos', async (req, res) => {
    const alunos = await alunoService.getAllAlunos();
    res.json(alunos);
});



app.get('/api/alunos/:id', async (req, res) => { // Novo endpoint para buscar aluno por ID
    try {
        const id = req.params.id;
        const aluno = await alunoService.getAlunoById(id);
        res.json(aluno);
    } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ error: 'Erro ao buscar aluno' });
    }
});





app.post('/api/alunos', async (req, res) => {
    const aluno = req.body;
    await alunoService.insertAluno(aluno);
    res.status(201).json({ message: 'Aluno inserido com sucesso' });
});

app.put('/api/alunos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = req.body;
        await alunoService.updateAluno(id, aluno);
        res.json({ message: 'Aluno atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
});

app.delete('/api/alunos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await alunoService.deleteAluno(id);
        res.json({ message: 'Aluno deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar aluno:', error);
        res.status(500).json({ error: 'Erro ao deletar aluno' });
    }
});

module.exports = app;

