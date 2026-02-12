const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const controller = {
    index: (req, res) => {
        // Mover la lectura AQUÍ ADENTRO
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
        res.render('index', { products: products });
    }
};

module.exports = controller;