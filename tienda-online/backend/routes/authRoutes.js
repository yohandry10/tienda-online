const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/refresh', authController.refreshToken);

module.exports = router;
