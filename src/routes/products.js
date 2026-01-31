// src/routes/products.js
const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

// El ":id" es un comodín. Express guardará ahí el número que venga en la URL.
router.get('/detail/:id', productsController.detail);

// URL final: /products/cart
router.get('/cart', productsController.cart);

// URL final: /products/create
router.get('/create', productsController.create);

// URL final: /products/edit
router.get('/edit', productsController.edit);

module.exports = router;