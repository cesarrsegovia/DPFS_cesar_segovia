// src/controllers/productsController.js
const fs = require('fs');
const path = require('path');

// 1. Leemos el JSON de productos (igual que hiciste en mainController)
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    // Listado de productos (el Home muestra destacados, pero quizás quieras una lista completa luego)
    index: (req, res) => {
        // Por ahora lo mandamos al index, o creamos una vista 'products/list'
        res.render('products/productCart'); // Ejemplo temporal
    },
    detail: (req, res) => {
        // 2. Obtenemos el ID de la URL
        const id = req.params.id;
        
        // 3. Buscamos el producto exacto
        // (Usamos '==' en vez de '===' porque el ID de la URL es texto y en el JSON es número)
        const product = products.find(product => product.id == id);

        // Si el producto existe, lo mandamos a la vista
        if (product) {
            res.render('products/productDetail', { product: product });
        } else {
            res.send("¡Ups! No encontramos ese producto"); // Manejo simple de error
        }
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