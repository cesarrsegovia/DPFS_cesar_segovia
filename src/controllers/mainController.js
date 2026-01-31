const fs = require('fs');
const path = require('path');

// 1. Leemos el archivo JSON
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
        // 2. Enviamos la variable 'products' a la vista
        res.render('index', { products: products });
    }
};

module.exports = controller;