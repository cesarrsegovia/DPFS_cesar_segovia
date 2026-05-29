const bcrypt = require('bcryptjs'); // Importamos la librería de seguridad
const { validationResult } = require('express-validator');
const db = require('../../models'); // Importamos toda la base de datos

const controller = {
    // 1. Mostrar formulario de Login
    login: (req, res) => {
        res.render('users/login');
    },

    // 2. Mostrar formulario de Registro
    register: (req, res) => {
        res.render('users/register');
    },

    // --- PROCESAR REGISTRO ---
    processRegister: async (req, res) => { 
        
        // 1. Validación de express-validator (ESTO QUEDA IGUAL)
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            // Si subió un archivo y hay errores, lo borramos
            if (req.file) {
                const fs = require('fs');
                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }
            }
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        // --- ADIÓS JSON, HOLA POSTGRES ---
        try {
            // 2. Verificamos si el email ya existe en Postgres
            const userExists = await db.User.findOne({ 
                where: { email: req.body.email } 
            });

            if (userExists) {
                // Borramos el avatar si hay error de duplicación
                if (req.file) {
                    const fs = require('fs');
                    if (fs.existsSync(req.file.path)) {
                        fs.unlinkSync(req.file.path);
                    }
                }
                return res.render('users/register', {
                    errors: { email: { msg: 'Este correo ya está registrado' } },
                    oldData: req.body
                });
            }

            // 3. Si no existe, CREAMOS el usuario en la base de datos
            await db.User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                rol: 'user',
                image: req.file ? req.file.filename : 'default-avatar.png'
            });

            // 4. Redirigimos al login
            return res.redirect('/users/login');

        } catch (error) {
            // Si algo falla con la base de datos, lo vemos en la terminal
            console.error('Error al guardar el usuario:', error);
            return res.send('Ocurrió un error en la base de datos.');
        }
    },
    // --- PROCESAR LOGIN ---
    // 👇 ¡AGREGA ASYNC AQUÍ! 👇
    processLogin: async (req, res) => {
        
        // 1. Validaciones (QUEDA IGUAL)
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('users/login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        // --- ADIÓS JSON, BUSCAMOS EN POSTGRES ---
        try {
            // 2. Buscamos al usuario por su email en la Base de Datos
            const userToLogin = await db.User.findOne({ 
                where: { email: req.body.email } 
            });

            // Si el usuario existe, verificamos la contraseña
            if (userToLogin) {
                const isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);

                if (isOkThePassword) {
                    // ¡Todo correcto! Convertimos a objeto plano y borramos el password por seguridad
                    const userJSON = userToLogin.toJSON();
                    delete userJSON.password;

                    // Guardamos al usuario en la sesión
                    req.session.userLogged = userJSON;

                    // Lógica de "Recordarme" (Cookie)
                    if (req.body.remember_user) {
                        res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60 });
                    }

                    // Redirigimos al perfil
                    return res.redirect('/users/profile');
                }

                // Si la contraseña está mal
                return res.render('users/login', {
                    errors: { email: { msg: 'Las credenciales son inválidas' } },
                    oldData: req.body
                });
            }

            // Si el email no se encontró en la BD
            return res.render('users/login', {
                errors: { email: { msg: 'No se encuentra este email en nuestra base de datos' } },
                oldData: req.body
            });

        } catch (error) {
            console.error('Error en el login:', error);
            return res.send('Ocurrió un error en la base de datos.');
        }
    },
    // --- PERFIL DE USUARIO ---
    profile: (req, res) => {
        return res.render('users/profile', {
            user: req.session.userLogged
        });
    },
    // --- CERRAR SESIÓN ---
    logout: (req, res) => {
        // 1. Borramos la cookie de "Recordarme"
        res.clearCookie('userEmail'); 
        
        // 2. Destruimos la sesión del servidor
        req.session.destroy();
        
        // 3. ¡Adiós!
        return res.redirect('/');
    }
};

module.exports = controller;