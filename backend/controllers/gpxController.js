const { parseGPX } = require('../services/gpxService');
const { pool } = require('../db/connection');
const multer = require('multer');

// Configuración de multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' }).single('archivo');

// Función para formatear el tiempo
const formatTime = (time) => {
    return new Date(time).toISOString().slice(0, 19).replace('T', ' ');
};

const uploadGPX = async (req, res) => {
    const { id_trayecto } = req.body;

    // Verificar si se subió un archivo
    if (!req.file) {
        return res.status(400).json({ mensaje: 'Archivo GPX es requerido' });
    }

    try {
        // Procesar el archivo GPX
        const { puntos, stats } = await parseGPX(req.file.filename);

        // Validar que se hayan extraído puntos
        if (!puntos || puntos.length === 0) {
            return res.status(400).json({ mensaje: 'El archivo GPX no contiene puntos válidos' });
        }

        // Insertar en la tabla gpx_trayectos
        const queryTrayecto = `
            INSERT INTO gpx_trayectos (id_trayecto, distancia_km, duracion_minutos, velocidad_promedio, fecha_subida)
            VALUES (?, ?, ?, ?, NOW())
        `;
        pool.query(queryTrayecto, [id_trayecto, stats.distancia_km, stats.duracion_minutos, stats.velocidad_promedio], (error, result) => {
            if (error) {
                console.error('Error al insertar en gpx_trayectos:', error);
                return res.status(500).json({ mensaje: 'Error al procesar GPX', error: error.message });
            }

            // Obtener el ID del GPX insertado
            const id_gpx = result.insertId;

            // Preparar los valores de los puntos para la inserción
            const puntoValues = puntos.map(p => {
                if (!p.latitud || !p.longitud || !p.tiempo) {
                    throw new Error('El archivo GPX contiene puntos con valores faltantes');
                }
                return [
                    id_gpx,                // gpx_id
                    parseFloat(p.latitud),  // latitud (convertido a número)
                    parseFloat(p.longitud), // longitud (convertido a número)
                    parseFloat(p.altitud) || null, // elevacion (puede ser null)
                    formatTime(p.tiempo)   // tiempo formateado
                ];
            });

            // Verificar que todos los valores tienen el formato correcto
            console.log("Valores a insertar:", JSON.stringify(puntoValues, null, 2));

            // Construcción correcta de la consulta SQL
            const queryPuntos = `
                INSERT INTO gpx_puntos (gpx_id, latitud, longitud, elevacion, tiempo)
                VALUES ?
            `;

            // Ejecutar la consulta SQL con múltiples registros
            pool.query(queryPuntos, [puntoValues], (error, result) => {
                if (error) {
                    console.error('Error al insertar en gpx_puntos:', error);
                    return res.status(500).json({ mensaje: 'Error al procesar GPX', error: error.message });
                }

                // Respuesta exitosa
                res.status(201).json({ mensaje: 'GPX procesado correctamente', id_gpx });
            });
        });
    } catch (error) {
        console.error('Error al procesar GPX:', error);
        res.status(500).json({ mensaje: 'Error al procesar GPX', error: error.message });
    }
};

module.exports = { uploadGPX };
