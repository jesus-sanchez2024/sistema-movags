const express = require('express');
const router = express.Router();
const tecnologiaController = require('../controllers/tecnologiaController');

// Ruta para crear un registro de tecnología
router.post('/crear', tecnologiaController.createTecnologia);

module.exports = router;