const express = require('express');
const router = express.Router();
const trayectosController = require('../controllers/trayectosController');

// Ruta para crear un trayecto
router.post('/crear', trayectosController.createTrayecto);

module.exports = router;