const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ags_movilidad',
    port: 3306,
    connectionLimit: 10
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
    connection.release();
});

module.exports = { pool };
