const app = require('./app');
const { pool } = require('./db/connection');

const PORT = process.env.PORT || 3000;

// Verificar conexión a la base de datos antes de iniciar el servidor
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        process.exit(1);
    }

    console.log('✅ Conexión a la base de datos establecida.');
    connection.release();

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
});