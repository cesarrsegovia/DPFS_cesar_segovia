function adminMiddleware(req, res, next) {
    // 1. Si NO hay sesión iniciada...
    if (!req.session || !req.session.userLogged) {
        return res.redirect('/users/login'); // Afuera, al login.
    }

    // 2. Si SÍ hay sesión, pero el rol NO es admin...
    if (req.session.userLogged.rol !== 'admin') {
        return res.redirect('/'); // Afuera, al Home. (No tienes permisos)
    }

    // 3. Si tienes sesión Y ADEMÁS eres admin, pasas.
    next(); 
}

module.exports = adminMiddleware;