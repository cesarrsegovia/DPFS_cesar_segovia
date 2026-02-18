// src/routes/users.js
const express = require('express');
const router = express.Router();

// 1. Importamos el controlador
const usersController = require('../controllers/usersController');
// 1. IMPORTAMOS AL GUARDIA
const guestMiddleware = require('../middlewares/guestMiddleware');

// 2. Definimos las rutas
// 2. LO PONEMOS EN EL MEDIO DE LA RUTA (Entre la URL y el Controlador)
// Fíjate cómo lo agregamos como segundo parámetro
router.get('/login', guestMiddleware, usersController.login);
router.get('/register', guestMiddleware, usersController.register);

// Para procesar los datos también lo ponemos (por seguridad extra)
router.post('/login', guestMiddleware, usersController.processLogin);
router.post('/register', guestMiddleware, usersController.processRegister);
router.get('/logout', usersController.logout);

module.exports = router;