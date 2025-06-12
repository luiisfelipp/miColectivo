const db = require('../db');
const jwt = require('jsonwebtoken');
const util = require('util'); // 👈 Para usar promisify
const bcrypt = require('bcrypt');

const query = util.promisify(db.query).bind(db); // 👈 Aquí convertimos a Promesa

exports.login = async (req, res) => {
  const { nombre, password } = req.body;

  try {
    const rows = await query(
      'SELECT * FROM auth_users WHERE nombre = ?',
      [nombre]
    );

    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      'secreto123',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: user.role
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


// REGISTRO
exports.register = async (req, res) => {
  const { nombre, email, telefono, password } = req.body;

  try {
    // Validar campos básicos
    if (!nombre || !password) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    // Verificar si usuario ya existe
    const existingUsers = await query('SELECT * FROM auth_users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'El correo ya existe' });
    }

    // Encriptar la contraseña (recomendado)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    await query(
      'INSERT INTO auth_users (nombre, email, telefono, password, role) VALUES (?, ?, ?, ?, ?)',
      [nombre, email, telefono, hashedPassword, 'usuario']
    );

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// PERFIL
exports.getPerfil = async (req, res) => {
  try {
    const userId = req.user.id;

    const rows = await query('SELECT nombre, email, telefono, role FROM auth_users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};