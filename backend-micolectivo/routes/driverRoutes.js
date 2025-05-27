const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Obtener todas las ubicaciones (simuladas)
router.get('/locations', driverController.getAllDrivers);

// Actualizar ubicación en tiempo real
router.post('/update-location', driverController.updateLocation);

// Obtener cantidad de pasajeros
router.get('/:driverId/passenger-count', driverController.getPassengerCount);

// Actualizar cantidad de pasajeros
router.post('/update-passenger-count', driverController.updatePassengerCount);

// Nueva API para visibilidad
router.get('/vehiculos/visibilidad', driverController.getVisibilidad);
router.post('/vehiculos/visibilidad', driverController.setVisibilidad);


module.exports = router;
