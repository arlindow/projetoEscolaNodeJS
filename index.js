

























/*
(async () => {
    
    const db= require('./services/alunoService')

    const id = 4; // Substitua pelo ID correto do aluno
    
    
    await db.deleteAluno(id);

    console.log('Aluno de id n°: ' + id + ' excluido com sucesso');

})(); 
*/

/*
(async () => {
    const db = require('./services/alunoService');

    console.log('Cadastro de Aluno');

    const aluno = { nome: 'Guinha', turma: 'B', telefone: '87981735013' };
    await db.insertAluno(aluno);

    console.log('Aluno: ' + aluno.nome + ' cadastrado com sucesso');
})();
*/
/*
(async () => {
    const alunoService = require('./services/alunoService');

    const id = 3; // Substitua pelo ID correto do aluno
    const aluno = { 
        nome: 'Sthefany K', 
        turma: 'B', 
        telefone: '87900000000'
    };
    
    await alunoService.updateAluno(id, aluno);

    console.log('Aluno atualizado com sucesso');
})();
*/
/* 
(async () => {
    const alunoService = require('./services/alunoService');

    console.log('Alunos cadastrados');

    const alunos = await alunoService.getAllAlunos();

    console.log(alunos);
})();
*/


