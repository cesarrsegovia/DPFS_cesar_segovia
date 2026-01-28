const express = require('express');
const path = require('path');
const mainRoutes = require('./routes/main');

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

// Levantar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});