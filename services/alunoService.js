const { connect } = require('../db/connection');

const getAllAlunos = async () => {
    const con = await connect();
    const [results] = await con.query('SELECT idaluno, nome, turma, telefone FROM aluno');
    return results;
};


const getAlunoById = async (idaluno) => { // Novo método para buscar aluno por ID
    const con = await connect();
    const [results] = await con.query('SELECT idaluno, nome, turma, telefone FROM aluno WHERE idaluno = ?', [idaluno]);
    return results[0];
};



const insertAluno = async (aluno) => {
    const con = await connect();
    const sql = 'INSERT INTO aluno(nome, turma, telefone) VALUES (?, ?, ?)';
    const values = [aluno.nome, aluno.turma, aluno.telefone];
    await con.query(sql, values);
};

const updateAluno = async (idaluno, aluno) => {
    const con = await connect();
    const sql = 'UPDATE aluno SET nome=?, turma=?, telefone=? WHERE idaluno=?';
    const values = [aluno.nome, aluno.turma, aluno.telefone, idaluno];
    await con.query(sql, values);
};

const deleteAluno = async (idaluno) => {
    const con = await connect();
    const sql = 'DELETE FROM aluno WHERE idaluno=?';
    await con.query(sql, [idaluno]);
};

module.exports = {
    getAllAlunos,
    getAlunoById, // Exportar novo método
    insertAluno,
    updateAluno,
    deleteAluno
};