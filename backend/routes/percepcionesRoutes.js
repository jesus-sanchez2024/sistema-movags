const express = require('express');
const router = express.Router();
const percepcionesController = require('../controllers/percepcionesController');

// Ruta para crear una percepción
router.post('/crear', percepcionesController.createPercepcion);

module.exports = router;