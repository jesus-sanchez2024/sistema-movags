const { pool } = require('../db/connection');

const createTecnologia = async (req, res) => {
    const { usuario_id, app_preferida, frecuencia_uso, opcion_id } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!usuario_id || !app_preferida || !frecuencia_uso || !opcion_id) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        // Ejecutar la consulta SQL
        const query = `
            INSERT INTO tecnologia (usuario_id, app_preferida, frecuencia_uso, opcion_id)
            VALUES (?, ?, ?, ?)
        `;
        pool.query(query, [usuario_id, app_preferida, frecuencia_uso, opcion_id], (error, result) => {
            if (error) {
                console.error('Error al registrar tecnología:', error);
                return res.status(500).json({ mensaje: 'Error al registrar tecnología', error: error.message });
            }

            // Verificar si la inserción fue exitosa
            if (result && result.affectedRows === 1) {
                res.status(201).json({ mensaje: 'Tecnología registrada correctamente', id: result.insertId });
            } else {
                res.status(500).json({ mensaje: 'No se pudo registrar la tecnología' });
            }
        });
    } catch (error) {
        console.error('Error al registrar tecnología:', error);
        res.status(500).json({ mensaje: 'Error al registrar tecnología', error: error.message });
    }
};

module.exports = {
    createTecnologia
};