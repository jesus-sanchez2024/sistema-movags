const express = require('express');
const router = express.Router();
const zonasController = require('../controllers/zonasController');

router.get('/', zonasController.obtenerZonasInteres);

module.exports = router;
