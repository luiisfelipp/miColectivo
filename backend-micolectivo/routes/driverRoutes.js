const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const db = require('../db'); // Ajustá el path si está en otra carpeta


// Obtener todas las ubicaciones (simuladas)
router.get('/locations', driverController.getAllDrivers);

// Actualizar ubicación en tiempo real
router.post('/update-location', driverController.updateLocation);

// Obtener cantidad de pasajeros
router.get('/:driverId/passenger-count', driverController.getPassengerCount);

//Lineas de drivers
router.get('/con-linea', driverController.getDriversConLinea);

// Actualizar cantidad de pasajeros
router.post('/update-passenger-count', driverController.updatePassengerCount);

// Nueva API para visibilidad
// Estas líneas DEBEN estar exactamente así:
router.get('/visibilidad/por-vehiculo', driverController.getVisibilidadPorVehiculo);

// Para los reportes del chofer a la central
router.post('/send-alert', driverController.sendEmergencyAlert);


//Para poder actualizar estado de visiblidad de conductor y registrar en BD
router.post('/visibilidad/por-vehiculo', (req, res) => {
  const { driverId, visible } = req.body;

  const updateQuery = 'UPDATE drivers SET is_active = ? WHERE id = ?';
  const insertQuery = `
    INSERT INTO registro_visibilidad (id_vehiculo, accion, fecha)
    VALUES (?, ?, NOW())
  `;

  db.query(updateQuery, [visible, driverId], (err) => {
    if (err) {
      console.error('Error al actualizar estado:', err);
      return res.status(500).json({ error: 'Error al actualizar visibilidad' });
    }

    const accion = visible ? 'MOSTRAR' : 'OCULTAR';

    db.query(insertQuery, [driverId, accion], (err2) => {
      if (err2) {
        console.error('Error al registrar log:', err2);
        return res.status(500).json({ error: 'Error al registrar historial' });
      }

      res.status(200).json({ mensaje: 'Visibilidad actualizada y registrada.' });
    });
  });
});





router.get('/visibilidad/historial', (req, res) => {
  const sql = `
    SELECT rv.id, rv.id_vehiculo, d.name AS nombre_vehiculo, rv.accion, rv.fecha
    FROM registro_visibilidad rv
    LEFT JOIN drivers d ON d.id = rv.id_vehiculo
    ORDER BY rv.fecha DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener historial:', err);
      return res.status(500).json({ error: 'No se pudo obtener el historial' });
    }

    res.json(results);
  });
});



module.exports = router;
