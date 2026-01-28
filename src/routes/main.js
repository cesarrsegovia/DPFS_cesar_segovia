const express = require('express');
const router = express.Router();

// Importamos el controlador que acabamos de crear
const mainController = require('../controllers/mainController');

// Definimos la ruta raíz
router.get('/', mainController.index);

module.exports = router;