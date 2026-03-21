const db = require('../../../models');

const productsAPIController = {
    // 1. LISTADO DE PRODUCTOS
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll();

            return res.json({
                meta: {
                    status: 200,
                    count: products.length,
                    url: '/api/products'
                },
                data: products
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
                return res.json({
                    meta: {
                        status: 200,
                        url: `/api/products/${req.params.id}`
                    },
                    data: product
                });
            } else {
                return res.status(404).json({
                    meta: { status: 404 },
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