const express = require('express');
const router = express.Router();
const {
  crearReporte,
  obtenerReportes,
  eliminarReporte
} = require('../controllers/reporteController');

router.post('/reportes', crearReporte);
router.get('/reportes', obtenerReportes);
router.delete('/reportes/:id', eliminarReporte);

module.exports = router;
