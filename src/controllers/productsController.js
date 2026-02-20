// src/controllers/productsController.js
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const db = require('../../models'); // Importamos la base de datos

// 1. Leemos el JSON de productos (igual que hiciste en mainController)
const productsFilePath = path.join(__dirname, '../data/products.json');
// Helper para leer el JSON (reutilizable)
const getProducts = () => {
    // Si el archivo está vacío o da error, devolvemos un array vacío para que no rompa
    if (!fs.existsSync(productsFilePath)) return [];
    const fileContent = fs.readFileSync(productsFilePath, 'utf-8');
    // Si el archivo está vacío, devolvemos array vacío
    return fileContent ? JSON.parse(fileContent) : [];
};

const controller = {
    // Listado de productos (el Home muestra destacados, pero quizás quieras una lista completa luego)
    index: (req, res) => {
        // Como los productos se ven en el Home, redirigimos hacia allá
        return res.redirect('/');
    },
    // 👇 NO OLVIDES EL ASYNC 👇
    detail: async (req, res) => {
        try {
            // Buscamos UN SOLO producto por el ID que viene en la URL
            const product = await db.Product.findByPk(req.params.id);
            
            if (product) {
                return res.render('products/productDetail', { product });
            } else {
                return res.send('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error al mostrar el detalle:', error);
            return res.send('Error de base de datos');
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

    // 👇 ¡AGREGAMOS ASYNC AQUÍ! 👇
    store: async (req, res) => {
        // 1. VALIDACIONES (Esto queda igual que antes)
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            if (req.file) {
                // Usamos directamente req.file.path
                fs.unlinkSync(req.file.path); 
            }
            return res.render('products/productCreate', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        // --- ADIÓS JSON, HOLA POSTGRES ---
        try {
            // 2. CREAMOS EL PRODUCTO EN LA BASE DE DATOS
            await db.Product.create({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                category: req.body.category,
                // Si subió imagen, guardamos el nombre. Si no, una por defecto.
                image: req.file ? req.file.filename : 'default-image.png' 
            });

            // 3. Redirigimos al listado de productos
            return res.redirect('/products');

        } catch (error) {
            console.error('Error al guardar el producto:', error);
            return res.send('Ocurrió un error en la base de datos al crear el producto.');
        }
    },
    // 👇 ASYNC 👇
    edit: async (req, res) => {
        try {
            // Buscamos el producto por su ID
            const product = await db.Product.findByPk(req.params.id);
            
            if (product) {
                return res.render('products/productEdit', { product });
            } else {
                return res.send('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error al cargar la edición:', error);
            return res.send('Error de base de datos');
        }
    },
    // NUEVO MÉTODO UPDATE
    // 👇 ASYNC 👇
    update: async (req, res) => {
        // 1. Validaciones
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            if (req.file) { fs.unlinkSync(req.file.path); } // Borramos foto nueva si hay error
            
            // Necesitamos el producto viejo para volver a renderizar la vista correctamente
            const productToEdit = await db.Product.findByPk(req.params.id);
            
            return res.render('products/productEdit', {
                errors: resultValidation.mapped(),
                oldData: req.body,
                product: productToEdit
            });
        }

        // --- ACTUALIZANDO EN POSTGRES ---
        try {
            // Buscamos el producto viejo para saber qué imagen tenía
            const productToUpdate = await db.Product.findByPk(req.params.id);

            //  Actualizamos en la base de datos
            await db.Product.update({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                category: req.body.category,
                // Lógica mágica: ¿Subió foto nueva? Úsala. ¿No subió? Deja la vieja.
                image: req.file ? req.file.filename : productToUpdate.image
            }, {
                where: { id: req.params.id } // Condición: actualiza solo este ID
            });

            // Redirigimos al detalle del producto para ver los cambios
            return res.redirect('/products/detail/' + req.params.id); // Ajusta esta ruta si en tu sistema es diferente

        } catch (error) {
            console.error('Error al actualizar:', error);
            return res.send('Error en la base de datos');
        }
    },
    destroy: (req, res) => {
        // Leer el JSON
        const products = getProducts();
        const id = req.params.id;

        // 2. Filtrar: Creamos una lista nueva SIN el producto que tiene ese ID
        // "Quiero todos los productos cuyo ID sea DISTINTO (!=) al que llegó"
        const finalProducts = products.filter(product => product.id != id);

        // 3. Guardar la nueva lista en el JSON
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, 2), 'utf-8');

        // 4. Redirigir al Home (porque el detalle ya no existe)
        res.redirect('/');
    }
};

module.exports = controller;