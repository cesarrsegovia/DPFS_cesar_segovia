const fs = require('fs');
const path = require('path');

function userLoggedMiddleware(req, res, next) {
    // 1. Variable para saber si mostramos "Login" o "Salir" en el menú
    res.locals.isLogged = false;

    // 2. LOGICA DE COOKIE (El Recordarme)
    // Si hay una cookie 'userEmail', buscamos a ese usuario
    let emailInCookie = req.cookies.userEmail;
    
    // Leemos el JSON de usuarios (Necesitamos buscar al usuario por su email)
    // Asegúrate de que la ruta a tu JSON sea correcta
    const usersFilePath = path.join(__dirname, '../data/users.json');
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    // Buscamos al usuario de la cookie
    let userFromCookie = users.find(user => user.email === emailInCookie);

    // Si encontramos al usuario de la cookie, LO METEMOS EN LA SESIÓN
    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    // 3. LOGICA DE SESIÓN (Para mostrar el nombre en el menú)
    // Si la sesión existe (ya sea por login normal o por la cookie de arriba)
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        
        // Pasamos el usuario a la vista, pero borramos la contraseña por seguridad
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;