// Importamos el pool de conexión a la base de datos
const db = require('../db');

// Función para manejar la solicitud GET de todas las líneas de colectivo
exports.getLineas = (req, res) => {
  // Consulta SQL para obtener todas las líneas registradas
  db.query('SELECT * FROM lineas', (err, results) => {
    if (err) {
      // Si hay error, devolvemos un 500 con el mensaje del error
      return res.status(500).json({ error: err });
    }
    // Si no hay error, enviamos el resultado como respuesta
    res.json(results);
  });
};
