const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { getPerfil } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/perfil', verifyToken, getPerfil);

module.exports = router;
