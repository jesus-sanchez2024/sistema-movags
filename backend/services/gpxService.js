const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');
const geolib = require('geolib');

exports.parseGPX = async (filePath) => {
  const gpxData = await fs.promises.readFile(filePath, 'utf-8');
  const parser = new XMLParser({ ignoreAttributes: false });
  const jsonObj = parser.parse(gpxData);

  if (!jsonObj.gpx || !jsonObj.gpx.trk || !jsonObj.gpx.trk.trkseg || !jsonObj.gpx.trk.trkseg.trkpt) {
    throw new Error('Archivo GPX sin puntos válidos');
  }

  const trackpoints = jsonObj.gpx.trk.trkseg.trkpt;
  const puntos = [];
  let distancia_km = 0;
  let altitudes = [];
  let tiempos = [];
  let paradas_detectadas = 0;

  let prevPoint = null;

  trackpoints.forEach((trkpt, index) => {
    const latitud = parseFloat(trkpt['@_lat']);
    const longitud = parseFloat(trkpt['@_lon']);
    const altitud = trkpt.ele ? parseFloat(trkpt.ele) : 0;
    const tiempo = trkpt.time ? new Date(trkpt.time).toISOString().slice(0, 19).replace('T', ' ') : null;

    puntos.push({ latitud, longitud, altitud, tiempo });

    if (altitud) altitudes.push(altitud);
    if (tiempo) tiempos.push(new Date(trkpt.time));

    if (prevPoint) {
      const distancia = geolib.getDistance(
        { latitude: prevPoint.latitud, longitude: prevPoint.longitud },
        { latitude: latitud, longitude: longitud }
      );

      const tiempo_diff = (new Date(trkpt.time) - new Date(prevPoint.tiempo)) / 1000;
      const velocidad = tiempo_diff > 0 ? (distancia / tiempo_diff) * 3.6 : 0; // km/h

      if (velocidad <= 1 && tiempo_diff >= 30) {
        paradas_detectadas += 1;
      }

      distancia_km += distancia / 1000;
    }

    prevPoint = { latitud, longitud, tiempo: trkpt.time };
  });

  const formatMySQLTime = (date) => date.toISOString().slice(11, 19);
  const formatMySQLDate = (date) => date.toISOString().slice(0, 10);

  const fecha = tiempos.length ? formatMySQLDate(tiempos[0]) : null;
  const hora_inicio = tiempos.length ? formatMySQLTime(tiempos[0]) : null;
  const hora_fin = tiempos.length ? formatMySQLTime(tiempos[tiempos.length - 1]) : null;

  const tiempo_total = hora_inicio && hora_fin
    ? Math.round((new Date(tiempos[tiempos.length - 1]) - new Date(tiempos[0])) / 1000)
    : 0;

  const duracion_minutos = Math.round(tiempo_total / 60);

  const velocidad_promedio = duracion_minutos
    ? distancia_km / (duracion_minutos / 60)
    : 0;

  const altitud_max = altitudes.length ? Math.max(...altitudes) : 0;
  const altitud_min = altitudes.length ? Math.min(...altitudes) : 0;

  return {
    puntos,
    stats: {
      distancia_km: +distancia_km.toFixed(3),
      distancia_total: +distancia_km.toFixed(3),
      duracion_minutos,
      tiempo_total,
      velocidad_promedio: +velocidad_promedio.toFixed(2),
      altitud_max,
      altitud_min,
      fecha,
      hora_inicio,
      hora_fin,
      paradas_detectadas,
    },
  };
};
