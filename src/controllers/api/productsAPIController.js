const db = require('../../../models');

const productsAPIController = {
    // 1. LISTADO DE PRODUCTOS
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll();

            // Calculamos countByCategory dinámicamente
            const countByCategory = {};
            products.forEach(product => {
                const category = product.category || 'otros';
                countByCategory[category] = (countByCategory[category] || 0) + 1;
            });

            // Mapeamos los productos con la estructura especificada
            const productsMapped = products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    // Array de una relación de uno a muchos (categorías)
                    categories: [{ name: product.category }],
                    detail: `http://localhost:3000/api/products/${product.id}`
                };
            });

            return res.json({
                count: products.length,
                countByCategory: countByCategory,
                products: productsMapped
            });
        } catch (error) {
            console.error('Error en API de productos (list):', error);
            return res.status(500).json({ error: 'Error al conectar con la base de datos' });
        }
    },

    // 2. DETALLE DE UN PRODUCTO
    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);

            if (product) {
                const productJSON = product.toJSON();

                // Añadimos arrays para cada relación de uno a muchos
                productJSON.categories = [{ name: product.category }];
                productJSON.colors = []; // Mapeamos vacío si no hay en base de datos
                productJSON.sizes = [];  // Mapeamos vacío si no hay en base de datos

                // Inyectamos la URL de la imagen del producto
                productJSON.imageUrl = `http://localhost:3000/img/${productJSON.image || 'default-image.png'}`;

                return res.json(productJSON);
            } else {
                return res.status(404).json({
                    error: 'Producto no encontrado'
                });
            }
        } catch (error) {
            console.error('Error en API de productos (detail):', error);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
    }
};

module.exports = productsAPIController;