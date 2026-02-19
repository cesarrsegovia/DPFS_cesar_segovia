// src/routes/users.js
const express = require('express');
const router = express.Router();

// 1. Importamos el controlador
const usersController = require('../controllers/usersController');
// 1. IMPORTAMOS AL GUARDIA
const guestMiddleware = require('../middlewares/guestMiddleware');
const { body } = require('express-validator');

// 2. CREAMOS LAS REGLAS (Array de validaciones)
const registerValidations = [
    body('name').notEmpty().withMessage('Debes escribir un nombre completo'),
    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail() // bail() frena si está vacío
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('La contraseña no puede estar vacía'),
];

// Definimos las rutas
// 2. LO PONEMOS EN EL MEDIO DE LA RUTA (Entre la URL y el Controlador)
router.get('/login', guestMiddleware, usersController.login);
router.get('/register', guestMiddleware, usersController.register);

// Para procesar los datos también lo ponemos (por seguridad extra)
router.post('/login', guestMiddleware, usersController.processLogin);
router.post('/register', guestMiddleware, registerValidations, usersController.processRegister);
router.get('/logout', usersController.logout);

module.exports = router;