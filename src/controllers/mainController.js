// 1. IMPORTAMOS LA BASE DE DATOS (Igual que hicimos en los otros controladores)
const db = require('../../models'); 

const controller = {
    // 👇 NO OLVIDES EL ASYNC 👇
    index: async (req, res) => {
        try {
            // Buscamos TODOS los productos en Postgres
            const products = await db.Product.findAll();
            
            // Renderizamos la vista 'index.ejs' y le pasamos los productos
            return res.render('index', { products });

        } catch (error) {
            console.error('Error al cargar el Home:', error);
            return res.send('Error al cargar la base de datos');
        }
    },
};

module.exports = controller;