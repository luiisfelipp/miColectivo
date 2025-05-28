const db = require('../db');

const crearReporte = (req, res) => {
  const { motivo, descripcion, colectivo } = req.body;
  const query = 'INSERT INTO reportes (motivo, descripcion, colectivo) VALUES (?, ?, ?)';
  db.query(query, [motivo, descripcion, colectivo], (err, result) => {
    if (err) {
      console.error('Error al guardar el reporte:', err);
      return res.status(500).json({ error: 'Error al guardar el reporte' });
    }
    res.status(201).json({ id: result.insertId, motivo, descripcion, colectivo });
  });
};

const obtenerReportes = (req, res) => {
  db.query('SELECT * FROM reportes', (err, results) => {
    if (err) {
      console.error('Error al obtener reportes:', err);
      return res.status(500).json({ error: 'Error al obtener reportes' });
    }
    res.json(results);
  });
};

const eliminarReporte = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM reportes WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error al eliminar el reporte:', err);
      return res.status(500).json({ error: 'Error al eliminar el reporte' });
    }
    res.status(200).json({ message: 'Reporte eliminado' });
  });
};

module.exports = {
  crearReporte,
  obtenerReportes,
  eliminarReporte
};