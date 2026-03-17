const express = require('express');
const router = express.Router();

// Importamos el controlador que acabamos de crear
const usersAPIController = require('../../controllers/api/usersAPIController');

// Cuando pidan la raíz de esta ruta (/) por GET, ejecutamos el método list
router.get('/', usersAPIController.list);
// 👇 Detalle de un usuario: /api/users/1 👇
router.get('/:id', usersAPIController.detail);

module.exports = router;//asddas