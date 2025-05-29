const express = require('express');
const router = express.Router();
const {
  crearReporte,
  obtenerReportes,
  eliminarReporte,
  actualizarReporte // 
} = require('../controllers/reporteController');


router.post('/reportes', crearReporte);
router.get('/reportes', obtenerReportes);
router.delete('/reportes/:id', eliminarReporte);

// Nueva ruta para actualizar estado de un reporte
router.put('/reportes/:id', actualizarReporte); // 👈 esta es la nueva línea

module.exports = router;
