const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

let connection;

const connect = async () => {
    if (connection && connection.state !== 'disconnected') {
        return connection;
    }
    connection = await mysql.createConnection(dbConfig);
    console.log('Conexão efetuada com sucesso!');
    return connection;
};

module.exports = { connect };
