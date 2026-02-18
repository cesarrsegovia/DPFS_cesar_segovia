const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

// SISTEMAS DE RUTAS
const mainRoutes = require('./routes/main');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

const app = express();
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

// Configuración de la carpeta pública (Imágenes y CSS)
// Le decimos a Express: "Todo lo que esté en 'public', sírvelo directo"
app.use(express.static(path.join(__dirname, '../public')));

app.use(methodOverride('_method'));

// Configuración del Motor de Plantillas (EJS)
app.set('view engine', 'ejs');
// Le decimos dónde están las vistas (ahora dentro de src/views)
app.set('views', path.join(__dirname, 'views'));

// --- RUTAS TEMPORALES (Para probar que funciona) ---

// 2. CONFIGURAR LA SESIÓN (Debe ir ANTES de las rutas)
app.use(session({
    secret: 'MiSecretoSuperSeguro123', // Una llave secreta para proteger la sesión
    resave: false,
    saveUninitialized: false
}));

// 3. MIDDLEWARE GLOBAL (El puente entre la sesión y tus vistas EJS)
// Esto debe ir JUSTO DEBAJO de la configuración de la sesión
app.use((req, res, next) => {
    // Por defecto, decimos que nadie está logueado
    res.locals.isLogged = false; 

    // Si detectamos a alguien en la memoria de la sesión...
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true; // Cambiamos a verdadero
        res.locals.userLogged = req.session.userLogged; // Pasamos sus datos a EJS
    }
    next();
});

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