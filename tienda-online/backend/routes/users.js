const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Ruta para registrar un nuevo usuario
router.post('/register', usersController.registerUser);

// Ruta para iniciar sesión
router.post('/login', usersController.loginUser);

module.exports = router;
