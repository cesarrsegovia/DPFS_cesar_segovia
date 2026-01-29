const express = require('express');
const path = require('path');

// SISTEMAS DE RUTAS
const mainRoutes = require('./routes/main');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

const app = express();

// Configuración de la carpeta pública (Imágenes y CSS)
// Le decimos a Express: "Todo lo que esté en 'public', sírvelo directo"
app.use(express.static(path.join(__dirname, '../public')));

// Configuración del Motor de Plantillas (EJS)
app.set('view engine', 'ejs');
// Le decimos dónde están las vistas (ahora dentro de src/views)
app.set('views', path.join(__dirname, 'views'));

// --- RUTAS TEMPORALES (Para probar que funciona) ---

// USAR LAS RUTAS
app.use('/', mainRoutes);

// Login
app.get('/login', (req, res) => {
    res.render('users/login'); // Mira cómo buscamos dentro de la carpeta users
});

// Registro
app.get('/register', (req, res) => {
    res.render('users/register');
});

// Detalle de Producto
app.get('/productDetail', (req, res) => {
    res.render('products/productDetail');
});

// Carrito
app.get('/productCart', (req, res) => {
    res.render('products/productCart');
});

// 2. USAR LAS RUTAS CON PREFIJOS
app.use('/', mainRoutes);             // Rutas raíz (Home)
app.use('/users', usersRoutes);       // Todas las rutas de usuarios empiezan con /users
app.use('/products', productsRoutes); // Todas las rutas de productos empiezan con /products

// Levantar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});