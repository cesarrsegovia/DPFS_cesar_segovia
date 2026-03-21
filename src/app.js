require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// SISTEMAS DE RUTAS
const mainRoutes = require('./routes/main');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const apiUsersRouter = require('./routes/api/users');
const apiProductsRouter = require('./routes/api/products');

// 👇 IMPORTAMOS LA BASE DE DATOS 
const db = require('../models');

// 👇 PROBAMOS LA CONEXIÓN
db.sequelize.authenticate()
    .then(() => {
        console.log('🐘 ¡Conexión a PostgreSQL exitosa! La magia de Sequelize funciona.');
    })
    .catch((error) => {
        console.error('❌ Error al conectar con la base de datos:', error);
    });

const app = express();
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(cors());

// Configuración de la carpeta pública (Imágenes y CSS)
// Le decimos a Express: "Todo lo que esté en 'public', sírvelo directo"
app.use(express.static(path.join(__dirname, '../public')));

app.use(methodOverride('_method'));

// Configuración del Motor de Plantillas (EJS)
app.set('view engine', 'ejs');
// Le decimos dónde están las vistas (ahora dentro de src/views)
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());

// 2. CONFIGURAR LA SESIÓN (Debe ir ANTES de las rutas)
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret-change-in-production',
    resave: false,
    saveUninitialized: false
}));

// 3. MIDDLEWARE GLOBAL (El puente entre la sesión y tus vistas EJS)
// Debe ir DESPUÉS de session() y cookieParser()
app.use(userLoggedMiddleware);

// USAR LAS RUTAS CON PREFIJOS
app.use('/', mainRoutes);             // Rutas raíz (Home)
app.use('/users', usersRoutes);       // Todas las rutas de usuarios empiezan con /users
app.use('/products', productsRoutes); // Todas las rutas de productos empiezan con /products
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);

module.exports = app;