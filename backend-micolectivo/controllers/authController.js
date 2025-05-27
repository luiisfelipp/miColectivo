const db = require('../db');

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan credenciales' });
  }

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?'; // IMPORTANTE: en producción usa hashing
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Aquí se puede generar un JWT. Por ahora, enviamos un token simple simulado
    const fakeToken = 'TOKEN123'; // En producción, se usa JWT real
    res.json({ token: fakeToken, user: results[0] });
  });
};
