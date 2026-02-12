// src/controllers/productsController.js
const fs = require('fs');
const path = require('path');

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
        // Por ahora lo mandamos al index, o creamos una vista 'products/list'
        res.render('products/productCart'); // Ejemplo temporal
    },
    detail: (req, res) => {
    // 1. LLAMAMOS A LA FUNCIÓN PARA TRAER LOS DATOS
    const products = getProducts();

    // 2. Ahora sí buscamos
    const id = req.params.id;
    const product = products.find(product => product.id == id);

    if (product) {
        res.render('products/productDetail', { product: product });
    } else {
        res.send("Producto no encontrado");
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

    // --- LÓGICA DE GUARDADO (STORE) ---
    store: (req, res) => {
        // 1. Leemos todos los productos actuales
        const products = getProducts();

        // 2. Generamos un ID nuevo (Tomamos el último ID y le sumamos 1)
        // Si no hay productos, el ID es 1
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        // 3. Creamos el objeto nuevo producto
        const newProduct = {
            id: newId,
            name: req.body.name,          // Viene del input name="name"
            price: Number(req.body.price),// Convertimos a número
            discount: 0,                  // Por defecto 0
            category: req.body.category,
            description: req.body.description,
            // Si subió imagen, usamos el nombre del archivo. Si no, una por defecto.
            image: req.file ? req.file.filename : 'default-image.png'
        };

        // 4. Agregamos el nuevo producto al array
        products.push(newProduct);

        // 5. Sobrescribimos el archivo JSON con los datos nuevos
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');

        // 6. Redirigimos al usuario (al Home o al detalle del producto nuevo)
        res.redirect('/');
    },
    edit: (req, res) => {
        const products = getProducts(); // <--- Agrega esto
        const id = req.params.id;
        const product = products.find(product => product.id == id);

        res.render('products/productEdit', { product: product });
    },
    // NUEVO MÉTODO UPDATE
    update: (req, res) => {
        // 1. Leer todos los productos
        const products = getProducts();
        const id = req.params.id;

        // 2. Buscar el índice del producto que queremos editar
        const productIndex = products.findIndex(p => p.id == id);

        if (productIndex >= 0) {
             // 3. Modificar solo lo que llegó del formulario
             // Mantenemos la imagen vieja si no subió una nueva
             const oldProduct = products[productIndex];
             
             products[productIndex] = {
                ...oldProduct, // Copia todo lo viejo primero
                name: req.body.name,
                price: Number(req.body.price),
                category: req.body.category,
                description: req.body.description,
                // Si hay file nuevo usa ese, sino usa la imagen vieja
                image: req.file ? req.file.filename : oldProduct.image
             };

             // 4. Guardar en JSON
             fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
        }

        // 5. Redirigir al detalle
        res.redirect('/products/detail/' + id);
    },
    destroy: (req, res) => {
        // 1. Leer el JSON
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