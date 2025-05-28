const express = require('express');
const router = express.Router();
const lineaController = require('../controllers/lineaController');

// Ruta para obtener todas las líneas de colectivo
router.get('/', lineaController.getLineas);

module.exports = router;
