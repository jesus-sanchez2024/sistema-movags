const fs = require('fs');
const path = require('path');
const { DOMParser } = require('@xmldom/xmldom');
const togeojson = require('@tmcw/togeojson');
const geolib = require('geolib'); // Para cálculos de distancia

/**
 * Función para procesar un archivo GPX y extraer datos útiles
 * @param {string} fileName - Nombre del archivo GPX en la carpeta 'uploads'
 * @returns {Object} { puntos: [...], stats: {...} }
 */
const parseGPX = async (fileName) => {
    try {
        const filePath = path.join(__dirname, '../uploads/', fileName);
        const data = fs.readFileSync(filePath, 'utf8');

        // Convertir GPX a JSON con @tmcw/togeojson
        const doc = new DOMParser().parseFromString(data, 'text/xml'); // 🔹 Corrección del MIME type
        const geojson = togeojson.gpx(doc);

        // Validar que el archivo tenga la estructura esperada
        if (!geojson.features || geojson.features.length === 0) {
            throw new Error('El archivo GPX no contiene puntos válidos');
        }

        // Obtener los puntos
        const puntos = geojson.features.map(feature => ({
            latitud: feature.geometry.coordinates[1],
            longitud: feature.geometry.coordinates[0],
            altitud: feature.geometry.coordinates[2] || 0,
            tiempo: feature.properties.time || null
        }));

        // Calcular estadísticas del trayecto
        const stats = calcularEstadisticas(puntos);

        return { puntos, stats };
    } catch (error) {
        console.error('Error al procesar el archivo GPX:', error);
        throw new Error('No se pudo procesar el archivo GPX');
    }
};

/**
 * Calcula estadísticas básicas de un trayecto GPX
 * @param {Array} puntos - Lista de puntos del trayecto
 * @returns {Object} { distancia_km, duracion_minutos, velocidad_promedio, altitud_max, altitud_min }
 */
const calcularEstadisticas = (puntos) => {
    // Calcular distancia total en kilómetros
    let distancia_km = 0;
    for (let i = 1; i < puntos.length; i++) {
        distancia_km += geolib.getDistance(
            { latitude: puntos[i - 1].latitud, longitude: puntos[i - 1].longitud },
            { latitude: puntos[i].latitud, longitude: puntos[i].longitud }
        );
    }
    distancia_km /= 1000; // Convertir a kilómetros

    // Calcular duración en minutos
    const inicio = new Date(puntos[0].tiempo);
    const fin = new Date(puntos[puntos.length - 1].tiempo);
    const duracion_minutos = (fin - inicio) / (1000 * 60); // Convertir a minutos

    // Calcular velocidad promedio en km/h
    const velocidad_promedio = (distancia_km / duracion_minutos) * 60 || 0;

    // Calcular altitud máxima y mínima
    const altitud_max = Math.max(...puntos.map(p => p.altitud));
    const altitud_min = Math.min(...puntos.map(p => p.altitud));

    return { distancia_km, duracion_minutos, velocidad_promedio, altitud_max, altitud_min };
};

module.exports = { parseGPX };
