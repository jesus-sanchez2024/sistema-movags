const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuariosRoutes');
const trayectosRoutes = require('./routes/trayectosRoutes');
const percepcionesRoutes = require('./routes/percepcionesRoutes');
const tecnologiaRoutes = require('./routes/tecnologiaRoutes');
const gpxRoutes = require('./routes/gpxRoutes');
const authRoutes = require('./routes/authRoutes');

// Inicializar Express
const app = express();

// Middleware
app.use(cors()); // Permitir peticiones desde frontend
app.use(express.json()); // Soporte para JSON en requests

// Rutas
app.use('/api/usuarios', usuariosRoutes); // Cambiado a /api/usuarios
app.use('/api/trayectos', trayectosRoutes); // Cambiado a /api/trayectos
app.use('/api/percepciones', percepcionesRoutes); // Cambiado a /api/percepciones
app.use('/api/tecnologia', tecnologiaRoutes); // Cambiado a /api/tecnologia
app.use('/api/gpx', gpxRoutes); // Cambiado a /api/gpx
app.use('/api/auth', authRoutes);

// Exportar la app
module.exports = app;