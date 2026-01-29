// src/routes/products.js
const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

// URL final: /products/detail
router.get('/detail', productsController.detail); 

// URL final: /products/cart
router.get('/cart', productsController.cart);

// URL final: /products/create
router.get('/create', productsController.create);

// URL final: /products/edit
router.get('/edit', productsController.edit);

module.exports = router;