const fs = require('fs');
const util = require('util');
const mysql = require('../db/connection');
const { parseGPX } = require('../services/gpxService');

const unlinkFile = util.promisify(fs.unlink);

exports.uploadGPX = async (req, res) => {
  const { id_trayecto } = req.body;
  let connection;

  if (!req.file || !id_trayecto) {
    return res.status(400).json({ error: 'Archivo GPX e ID del trayecto son requeridos' });
  }

  const filePath = `uploads/${req.file.filename}`;

  try {
    const { puntos, stats } = await parseGPX(filePath);

    connection = await mysql.getConnection();
    await connection.beginTransaction();

    const [resultTrayecto] = await connection.execute(
      `INSERT INTO gpx_trayectos 
        (id_trayecto, distancia_km, distancia_total, duracion_minutos, tiempo_total, velocidad_promedio, altitud_max, altitud_min, fecha, hora_inicio, hora_fin, paradas_detectadas, fecha_subida, nombre_archivo) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
      [
        id_trayecto,
        stats.distancia_km,
        stats.distancia_total,
        stats.duracion_minutos,
        stats.tiempo_total,
        stats.velocidad_promedio,
        stats.altitud_max,
        stats.altitud_min,
        stats.fecha,
        stats.hora_inicio,
        stats.hora_fin,
        stats.paradas_detectadas,
        req.file.originalname,
      ]
    );

    const id_gpx = resultTrayecto.insertId;

    const puntosData = puntos.map(p => [
      id_gpx,
      p.latitud,
      p.longitud,
      p.altitud,
      p.tiempo,
    ]);

    await connection.query(
      'INSERT INTO gpx_puntos (gpx_id, latitud, longitud, elevacion, tiempo) VALUES ?',
      [puntosData]
    );

    await connection.commit();
    connection.release();

    res.status(201).json({ mensaje: 'GPX procesado exitosamente', id_gpx });

  } catch (error) {
    console.error(error);
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    res.status(500).json({ error: 'Error al procesar GPX' });
  } finally {
    await unlinkFile(filePath);
  }
};
