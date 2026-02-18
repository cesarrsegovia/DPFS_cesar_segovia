function guestMiddleware(req, res, next) {
    // Si el usuario YA ESTÁ logueado en la sesión...
    if (req.session && req.session.userLogged) {
        // ...lo rebotamos al Home (no tiene sentido que vea el Login/Registro)
        return res.redirect('/');
    }

    // Si NO está logueado, le abrimos la puerta para que siga su camino normal
    next(); 
}

module.exports = guestMiddleware;