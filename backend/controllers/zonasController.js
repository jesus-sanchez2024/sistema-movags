const mysql = require('../db/connection');

// Obtener todas las zonas de interés
exports.obtenerZonasInteres = async (req, res) => {
  try {
    const connection = await mysql.getConnection();
    const [zonas] = await connection.query('SELECT * FROM zonas_interes');
    connection.release();
    res.status(200).json(zonas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener zonas de interés' });
  }
};
