function authMiddleware(req, res, next) {
    // Si NO hay nadie en la sesión...
    if (!req.session || !req.session.userLogged) {
        // ...lo rebotamos a la página de Login
        return res.redirect('/users/login');
    }

    // Si SÍ está logueado, le abrimos la puerta para que haga lo que iba a hacer
    next(); 
}

module.exports = authMiddleware;