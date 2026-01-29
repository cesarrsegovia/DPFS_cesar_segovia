// src/controllers/productsController.js
const controller = {
    // Listado de productos (el Home muestra destacados, pero quizás quieras una lista completa luego)
    index: (req, res) => {
        // Por ahora lo mandamos al index, o creamos una vista 'products/list'
        res.render('products/productCart'); // Ejemplo temporal
    },
    detail: (req, res) => {
        res.render('products/productDetail');
    },
    cart: (req, res) => {
        res.render('products/productCart');
    },
    // --- NUEVO SPRINT 3: CREACIÓN Y EDICIÓN ---
    create: (req, res) => {
        // Debes crear este archivo: src/views/products/productCreate.ejs
        res.render('products/productCreate'); 
    },
    edit: (req, res) => {
        // Debes crear este archivo: src/views/products/productEdit.ejs
        res.render('products/productEdit');
    }
};

module.exports = controller;