// 1. Importamos la base de datos (Ajusta la ruta si es necesario)
const db = require('../../models'); // o '../models' dependiendo de dónde esté tu carpeta models

// 👇 ¡AGREGAMOS ASYNC AQUÍ! 👇
async function userLoggedMiddleware(req, res, next) {
    // Variable para saber si mostramos "Login" o "Salir" en el menú
    res.locals.isLogged = false;

    // 2. LOGICA DE COOKIE (El Recordarme con Postgres)
    let emailInCookie = req.cookies.userEmail;

    // Si hay cookie, buscamos en la Base de Datos
    if (emailInCookie) {
        try {
            let userFromCookie = await db.User.findOne({
                where: { email: emailInCookie }
            });

            if (userFromCookie) {
                // Convertimos a objeto plano y borramos el password por seguridad
                const userJSON = userFromCookie.toJSON();
                delete userJSON.password;
                req.session.userLogged = userJSON;
            }
        } catch (error) {
            console.error('Error buscando cookie en DB:', error);
        }
    }

    // 3. LOGICA DE SESIÓN (Para mostrar el nombre en el menú)
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;