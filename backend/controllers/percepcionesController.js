const { pool } = require('../db/connection');

const createPercepcion = async (req, res) => {
    const { usuario_id, usa_transporte, frecuencia, principal_medio, opinion_movilidad, sugerencias, opcion_id } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!usuario_id || !usa_transporte || !frecuencia || !principal_medio || !opinion_movilidad || !sugerencias || !opcion_id) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        // Ejecutar la consulta SQL
        const query = `
            INSERT INTO percepciones (usuario_id, usa_transporte, frecuencia, principal_medio, opinion_movilidad, sugerencias, opcion_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        pool.query(query, [usuario_id, usa_transporte, frecuencia, principal_medio, opinion_movilidad, sugerencias, opcion_id], (error, result) => {
            if (error) {
                console.error('Error al registrar percepción:', error);
                return res.status(500).json({ mensaje: 'Error al registrar percepción', error: error.message });
            }

            // Verificar si la inserción fue exitosa
            if (result && result.affectedRows === 1) {
                res.status(201).json({ mensaje: 'Percepción guardada correctamente', id: result.insertId });
            } else {
                res.status(500).json({ mensaje: 'No se pudo registrar la percepción' });
            }
        });
    } catch (error) {
        console.error('Error al registrar percepción:', error);
        res.status(500).json({ mensaje: 'Error al registrar percepción', error: error.message });
    }
};

module.exports = {
    createPercepcion
};