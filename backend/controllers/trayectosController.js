const { pool } = require('../db/connection');
const mysql = require('../db/connection'); // Asegúrate de importar mysql para otras funciones

const createTrayecto = async (req, res) => {
    const { usuario_id, origen, destino, motivo, horario_salida, horario_llegada, medio_transporte } = req.body;

    if (!usuario_id || !origen || !destino || !motivo || !horario_salida || !horario_llegada || !medio_transporte) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        const query = `
            INSERT INTO trayectos (usuario_id, origen, destino, motivo, horario_salida, horario_llegada, medio_transporte)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        pool.query(query, [usuario_id, origen, destino, motivo, horario_salida, horario_llegada, medio_transporte], (error, result) => {
            if (error) {
                console.error('Error al registrar trayecto:', error);
                return res.status(500).json({ mensaje: 'Error al registrar trayecto', error: error.message });
            }

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

// Distribución medios transporte
const mediosTransporte = async (req, res) => {
    try {
      const connection = await mysql.getConnection();
      const [result] = await connection.query(`
        SELECT medio_transporte, COUNT(*) AS cantidad
        FROM trayectos GROUP BY medio_transporte
      `);
      connection.release();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo datos' });
    }
};
  
// Tiempos promedio
const tiemposPromedio = async (req, res) => {
    try {
      const connection = await mysql.getConnection();
      const [result] = await connection.query(`
        SELECT medio_transporte, AVG(tiempo_estimado) AS promedio_tiempo
        FROM trayectos GROUP BY medio_transporte
      `);
      connection.release();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo tiempos promedio' });
    }
};
  
// Evolución diaria (por hora)
const evolucionDiaria = async (req, res) => {
    try {
      const connection = await mysql.getConnection();
      const [result] = await connection.query(`
        SELECT HOUR(horario_salida) AS hora, COUNT(*) AS total
        FROM trayectos GROUP BY hora ORDER BY hora
      `);
      connection.release();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo evolución diaria' });
    }
};

module.exports = {
    createTrayecto,
    mediosTransporte,
    tiemposPromedio,
    evolucionDiaria
};
