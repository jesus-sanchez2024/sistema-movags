const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Ruta para crear un usuario
router.post('/crear', usuariosController.crearUsuario);

// Otras rutas necesarias
router.get('/', usuariosController.obtenerUsuarios);
router.get('/:id', usuariosController.obtenerUsuarioPorId);
router.put('/actualizar/:id', usuariosController.actualizarUsuario);
router.delete('/eliminar/:id', usuariosController.eliminarUsuario);

module.exports = router;