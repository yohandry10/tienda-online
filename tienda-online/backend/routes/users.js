const express = require('express');
const { body, validationResult } = require('express-validator');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    await usersController.getAllUsers(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener todos los usuarios", error: error });
  }
});

// Ruta para registrar un nuevo usuario con validación
router.post('/register', [
  body('username').trim().isLength({ min: 5 }).withMessage('El nombre de usuario debe tener al menos 5 caracteres.'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await usersController.registerUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error: error });
  }
});

// Ruta para iniciar sesión con validación
router.post('/login', [
  body('username').trim().isLength({ min: 5 }).withMessage('El nombre de usuario es requerido.'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña es requerida.')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await usersController.loginUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error });
  }
});

// Ruta para obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    await usersController.getUserById(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario por ID", error: error });
  }
});

// Ruta para actualizar un usuario por ID
router.put('/:id', async (req, res) => {
  try {
    await usersController.updateUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario por ID", error: error });
  }
});

// Ruta para eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
  try {
    await usersController.deleteUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario por ID", error: error });
  }
});

module.exports = router;
