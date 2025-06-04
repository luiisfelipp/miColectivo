const express = require('express');
const router = express.Router();
const {
  crearReporte,
  obtenerReportes,
  eliminarReporte,
  actualizarReporte,
  obtenerReportesChofer // ✅ importante
} = require('../controllers/reporteController');

// Rutas para reportes de pasajeros
router.post('/reportes', crearReporte);
router.get('/reportes', obtenerReportes);
router.delete('/reportes/:id', eliminarReporte);
router.put('/reportes/:id', actualizarReporte);

// Ruta para reportes de choferes (usando tabla `alerts`)
router.get('/reportes/chofer/:driverId', obtenerReportesChofer); // ✅ ya funciona ahora

module.exports = router;
