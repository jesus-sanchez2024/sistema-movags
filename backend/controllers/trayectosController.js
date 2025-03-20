const { pool } = require('../db/connection');

const createTrayecto = async (req, res) => {
    const { usuario_id, origen, destino, motivo, horario_salida, horario_llegada, medio_transporte } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!usuario_id || !origen || !destino || !motivo || !horario_salida || !horario_llegada || !medio_transporte) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        // Ejecutar la consulta SQL
        const query = `
            INSERT INTO trayectos (usuario_id, origen, destino, motivo, horario_salida, horario_llegada, medio_transporte)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        pool.query(query, [usuario_id, origen, destino, motivo, horario_salida, horario_llegada, medio_transporte], (error, result) => {
            if (error) {
                console.error('Error al registrar trayecto:', error);
                return res.status(500).json({ mensaje: 'Error al registrar trayecto', error: error.message });
            }

            // Verificar si la inserción fue exitosa
            if (result && result.affectedRows === 1) {
                res.status(201).json({ mensaje: 'Trayecto registrado correctamente', id: result.insertId });
            } else {
                res.status(500).json({ mensaje: 'No se pudo registrar el trayecto' });
            }
        });
    } catch (error) {
        console.error('Error al registrar trayecto:', error);
        res.status(500).json({ mensaje: 'Error al registrar trayecto', error: error.message });
    }
};

module.exports = {
    createTrayecto
};