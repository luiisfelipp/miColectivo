const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'secreto123');
    req.user = decoded; // guardamos la info del usuario para la siguiente función
    next(); // seguimos al controlador
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
