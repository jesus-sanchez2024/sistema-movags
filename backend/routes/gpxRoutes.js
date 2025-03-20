const express = require('express');
const router = express.Router();
const multer = require('multer');
const gpxController = require('../controllers/gpxController');

const upload = multer({ dest: 'uploads/' });

// Ruta para subir un archivo GPX
router.post('/subir', upload.single('archivo'), gpxController.uploadGPX);

module.exports = router;