// src/routes/users.js
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// 1. Importamos el controlador y los guardias
const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

// --- CONFIGURACIÓN DE MULTER (Carga de avatares de usuario) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/users'));
    },
    filename: (req, file, cb) => {
        const newFilename = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });

// 2. CREAMOS LAS REGLAS (Array de validaciones)
const registerValidations = [
    body('name')
        .notEmpty().withMessage('Debes escribir un nombre completo').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password')
        .notEmpty().withMessage('La contraseña no puede estar vacía').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        if (file) {
            let fileExtension = path.extname(file.originalname).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de imagen permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

const loginValidations = [
    body('email')
        .notEmpty().withMessage('Debes escribir un correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Debes escribir tu contraseña')
];

// Definimos las rutas
router.get('/login', guestMiddleware, usersController.login);
router.get('/register', guestMiddleware, usersController.register);

// Para procesar los datos
router.post('/login', guestMiddleware, loginValidations, usersController.processLogin);
router.post('/register', upload.single('avatar'), guestMiddleware, registerValidations, usersController.processRegister);

// Perfil de usuario (Requiere estar logueado)
router.get('/profile', authMiddleware, usersController.profile);

router.get('/logout', usersController.logout);

module.exports = router;