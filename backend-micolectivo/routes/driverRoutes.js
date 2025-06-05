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
router.post('/visibilidad/por-vehiculo', driverController.setVisibilidadPorVehiculo);
router.get('/visibilidad/historial', driverController.getHistorialVisibilidad);

// Para los reportes del chofer a la central
router.post('/send-alert', driverController.sendEmergencyAlert);



module.exports = router;
