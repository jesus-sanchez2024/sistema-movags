const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('../db/connection');

// Login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await mysql.getConnection();

    const [rows] = await connection.execute(
      'SELECT * FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );

    connection.release();

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user.id_usuario, email: user.email }, 'tu_secret', { expiresIn: '8h' });

    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Registro de usuario
// Registro seguro (bcrypt)
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Contraseña segura

    const connection = await mysql.getConnection();

    await connection.execute(
      'INSERT INTO usuarios (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    connection.release();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};