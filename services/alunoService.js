const { connect } = require('../db/connection');

const getAllAlunos = async () => {
    const con = await connect();
    const [results] = await con.query('SELECT * FROM aluno');
    return results;
};

const insertAluno = async (aluno) => {
    const con = await connect();
    const sql = 'INSERT INTO aluno(nome, turma, telefone) VALUES (?, ?, ?)';
    const values = [aluno.nome, aluno.turma, aluno.telefone];
    await con.query(sql, values);
};

const updateAluno = async (id, aluno) => {
    const con = await connect();
    const sql = 'UPDATE aluno SET nome=?, turma=?, telefone=? WHERE idaluno=?';
    const values = [aluno.nome, aluno.turma, aluno.telefone, id];
    await con.query(sql, values);
};

const deleteAluno = async (id) => {
    const con = await connect();
    const sql = 'DELETE FROM aluno WHERE idaluno=?';
    await con.query(sql, [id]);
};

module.exports = {
    getAllAlunos,
    insertAluno,
    updateAluno,
    deleteAluno
};
