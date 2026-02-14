// src/routes/users.js
const express = require('express');
const router = express.Router();

// 1. Importamos el controlador
const usersController = require('../controllers/usersController');

// 2. Definimos las rutas
// Como en app.js diremos que todo esto empieza con "/users", aquí solo ponemos la parte final
router.get('/login', usersController.login);      // URL final: /users/login
router.get('/register', usersController.register); // URL final: /users/register

// NUEVA RUTA: Para PROCESAR el formulario de registro (POST)
router.post('/register', usersController.processRegister);
// NUEVA RUTA: Para PROCESAR el formulario de login (POST)
router.post('/login', usersController.processLogin);

module.exports = router;