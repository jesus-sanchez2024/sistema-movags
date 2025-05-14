const express = require('express');
const router = express.Router();
const trayectosController = require('../controllers/trayectosController');

router.post('/crear', trayectosController.createTrayecto);
router.get('/medios-transporte', trayectosController.mediosTransporte);
router.get('/tiempos-promedio', trayectosController.tiemposPromedio);
router.get('/evolucion-diaria', trayectosController.evolucionDiaria);

module.exports = router;
