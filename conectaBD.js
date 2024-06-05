const conecta = async ()=> {
    if (global.conexao && global.conexao.state != 'disconected')
        return global.conexao
    
    const mysql = require('mysql2/promise')

    const con = mysql.createConnection("mysql://root:??????@localhost:3306/escola")

    console.log('Conexão efetuada com sucesso!')

    global.conexao = con 

    return con 

}

const todosAlunos = async()=>{
    const con = await conecta ()
    const [registros] = await con.query('SELECT * FROM aluno')

    return await registros
}
module.exports = {todosAlunos}

const inserirAluno = async(aluno)=>{
    const con = await conecta()
    const sqlInserir = 'INSERT INTO aluno(nome, turma, telefone) VALUES (?,?,?)'
    const dados = [aluno.nome, aluno.turma, aluno.telefone]
    await con.query(sqlInserir,dados)


}
module.exports = {inserirAluno}

const alterarAluno = async (id, aluno) => {
    const con = await conecta();

    const sqlAlterar = 'UPDATE aluno SET nome=?, turma=?, telefone=? WHERE idaluno=?';

    const dados = [aluno.nome, aluno.turma, aluno.telefone, id];

    console.log('Consulta SQL:', sqlAlterar);
    console.log('Dados:', dados);

    await con.query(sqlAlterar, dados);
}

module.exports = { alterarAluno };

const excluirAluno = async(id)=> {
    
    const con = await conecta()

    const sqlExcluir = 'DELETE FROM aluno WHERE idaluno=?'

    const dados = [id]

    await con.query(sqlExcluir, dados)

}
module.exports = { excluirAluno };










