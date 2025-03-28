const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ags_movilidad',
    port: 3306,
    connectionLimit: 10
});

// Exportar el pool usando promesas
module.exports = pool.promise();
