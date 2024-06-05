(async () => {
    const db = require('./conectaBD');

    console.log('Alunos cadastrados');

    const alunos = await db.todosAlunos();

    console.log(alunos);
})();



