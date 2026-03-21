const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

// Listado de productos: /api/products
router.get('/', productsAPIController.list);

// Detalle de un producto: /api/products/:id
router.get('/:id', productsAPIController.detail);

module.exports = router;