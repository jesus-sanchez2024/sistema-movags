const { pool } = require('../db/connection'); // Importar el pool de conexiones

// Crear un nuevo usuario
exports.crearUsuario = (req, res) => {
    const { nombre, edad, genero, ocupacion, email, telefono, password } = req.body;

    if (!nombre || !email || !password || !edad || !genero || !ocupacion || !telefono) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const sql = "INSERT INTO usuarios (nombre, edad, genero, ocupacion, email, telefono, password) VALUES (?, ?, ?, ?, ?, ?, ?)";

    pool.query(sql, [nombre, edad, genero, ocupacion, email, telefono, password], (err, result) => {
        if (err) {
            console.error("❌ Error al crear usuario:", err);
            return res.status(500).json({ mensaje: "Error al crear usuario" });
        }
        res.status(201).json({ mensaje: "Usuario creado correctamente", usuarioId: result.insertId });
    });
};

// Obtener todos los usuarios
exports.obtenerUsuarios = (req, res) => {
    pool.query("SELECT id, nombre, email FROM usuarios", (err, results) => {
        if (err) {
            console.error("❌ Error al obtener usuarios:", err);
            return res.status(500).json({ mensaje: "Error al obtener usuarios" });
        }
        res.status(200).json(results);
    });
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;

    pool.query("SELECT id, nombre, email FROM usuarios WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error("❌ Error al obtener usuario:", err);
            return res.status(500).json({ mensaje: "Error al obtener usuario" });
        }

        if (results.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(results[0]);
    });
};

// Actualizar un usuario por ID
exports.actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    if (!nombre || !email) {
        return res.status(400).json({ mensaje: "Nombre y email son obligatorios" });
    }

    const sql = "UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?";
    pool.query(sql, [nombre, email, password, id], (err, result) => {
        if (err) {
            console.error("❌ Error al actualizar usuario:", err);
            return res.status(500).json({ mensaje: "Error al actualizar usuario" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
    });
};

// Eliminar un usuario por ID
exports.eliminarUsuario = (req, res) => {
    const { id } = req.params;

    pool.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("❌ Error al eliminar usuario:", err);
            return res.status(500).json({ mensaje: "Error al eliminar usuario" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    });
};
