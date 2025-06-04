const db = require('../db');

const crearReporte = (req, res) => {
  const { motivo, descripcion, colectivo, nombre, email, telefono } = req.body;
  const query = `
    INSERT INTO reportes (motivo, descripcion, colectivo, nombre, email, telefono)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [motivo, descripcion, colectivo, nombre, email, telefono], (err, result) => {
    if (err) {
      console.error('Error al guardar el reporte:', err);
      return res.status(500).json({ error: 'Error al guardar el reporte' });
    }
    res.status(201).json({ id: result.insertId, motivo, descripcion, colectivo, nombre, email, telefono });
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

const actualizarReporte = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const query = 'UPDATE reportes SET estado = ? WHERE id = ?';
  db.query(query, [estado, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el estado del reporte:', err);
      return res.status(500).json({ error: 'Error al actualizar el estado del reporte' });
    }
    res.status(200).json({ message: 'Estado del reporte actualizado' });
  });
};



const obtenerReportesChofer = (req, res) => {
  const { driverId } = req.params;

  const query = 'SELECT * FROM alerts WHERE driver_id = ? ORDER BY timestamp DESC';

  db.query(query, [driverId], (err, results) => {
    if (err) {
      console.error('Error al obtener reportes de chofer:', err);
      return res.status(500).json({ error: 'Error al obtener reportes' });
    }
    res.json(results);
  });
};





module.exports = {
  crearReporte,
  obtenerReportes,
  eliminarReporte,
  actualizarReporte,
  obtenerReportesChofer
};