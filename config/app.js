const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const alunoService = require('../services/alunoService'); // Caminho corrigido

const app = express();
const PORT = 4123;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());

// Endpoint para obter todos os alunos
app.get('/api/alunos', async (req, res) => {
    try {
        const alunos = await alunoService.getAllAlunos();
        res.json(alunos);
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
});


// Endpoint para obter um aluno por ID
app.get('/api/alunos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = await alunoService.getAlunoById(id);
        if (aluno) {
            res.json(aluno);
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ error: 'Erro ao buscar aluno' });
    }
});



// Endpoint para inserir um novo aluno
app.post('/api/alunos', async (req, res) => {
    try {
        const aluno = req.body;
        await alunoService.insertAluno(aluno);
        res.status(201).json({ message: 'Aluno inserido com sucesso' });
    } catch (error) {
        console.error('Erro ao inserir aluno:', error);
        res.status(500).json({ error: 'Erro ao inserir aluno' });
    }
});

// Endpoint para atualizar um aluno
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

// Endpoint para deletar um aluno
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

// Servir a página HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});