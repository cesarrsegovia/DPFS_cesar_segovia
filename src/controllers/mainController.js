// 1. IMPORTAMOS LA BASE DE DATOS Y OPERADORES
const db = require('../../models'); 
const { Op } = require('sequelize');

const controller = {
    // 👇 NO OLVIDES EL ASYNC 👇
    index: async (req, res) => {
        try {
            const searchTerm = req.query.search;
            let products;

            if (searchTerm) {
                // Si hay un término de búsqueda, filtramos en Postgres
                products = await db.Product.findAll({
                    where: {
                        [Op.or]: [
                            { name: { [Op.iLike]: `%${searchTerm}%` } },
                            { description: { [Op.iLike]: `%${searchTerm}%` } }
                        ]
                    }
                });
            } else {
                // Si no hay búsqueda, traemos todo
                products = await db.Product.findAll();
            }
            
            // Renderizamos la vista 'index.ejs' y le pasamos los productos
            return res.render('index', { products });

        } catch (error) {
            console.error('Error al cargar el Home:', error);
            return res.send('Error al cargar la base de datos');
        }
    },
};

module.exports = controller;