const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs'); // Importamos la librería de seguridad

// Ruta al JSON de usuarios
const usersFilePath = path.join(__dirname, '../data/users.json');

// Función ayudante para leer los usuarios
const getUsers = () => {
    if (!fs.existsSync(usersFilePath)) return [];
    const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
    return fileContent ? JSON.parse(fileContent) : [];
};

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
    processRegister: (req, res) => {
        // 1. Leemos los usuarios actuales
        const users = getUsers();

        // verificar email duplicado
        const userExists = users.find(user => user.email === req.body.email);
        if (userExists) {
            // Si encuentra un usuario con ese correo, cortamos la ejecución aquí
            return res.send('Error: Este correo electrónico ya se encuentra registrado. ❌');
        }

        if (userExists) {
            return res.send('Error: El correo ya está registrado. ❌');
        }

        // 2. Generamos un ID nuevo
        const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        // 3. Creamos el objeto del nuevo usuario
        const newUser = {
            id: newId,
            name: req.body.name,
            email: req.body.email,
            // 🔒 ¡LA MAGIA! Encriptamos la contraseña antes de guardarla
            // El número 10 es el "salt" (el nivel de seguridad de la encriptación)
            password: bcrypt.hashSync(req.body.password, 10),

            // Le damos rol de 'user' por defecto a todos los que se registran
            rol: 'user'
        };

        // 4. Lo agregamos a la lista
        users.push(newUser);

        // 5. Sobrescribimos el archivo JSON
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');

        // 6. ¡Éxito! Lo redirigimos al login para que inicie sesión
        res.redirect('/users/login');
    },
    // --- PROCESAR LOGIN ---
    processLogin: (req, res) => {
        const users = getUsers();
        const userToLogin = users.find(user => user.email == req.body.email);

        if (userToLogin) {
            let isOk = bcrypt.compareSync(req.body.password, userToLogin.password);
            
            if (isOk) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                // 🍪 NUEVO: LÓGICA DE COOKIES 🍪
                // Si en el formulario llegó el checkbox marcado...
                if (req.body.remember_user) {
                    // Creamos una cookie llamada 'userEmail' con el email del usuario
                    // maxAge: Duración en milisegundos (Aquí: 1 hora)
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
                }

                return res.redirect('/');
            }
            
            return res.render('users/login', {
                errors: {
                    email: { msg: 'Las credenciales son inválidas' }
                }
            });
        }

        return res.render('users/login', {
            errors: {
                email: { msg: 'No se encuentra este email en nuestra base de datos' }
            }
        });
    },
    // --- CERRAR SESIÓN ---
    logout: (req, res) => {
        // 1. Destruimos la memoria temporal (la sesión)
        req.session.destroy();
        
        // 2. Redirigimos al usuario a la página de inicio
        return res.redirect('/');
    }
};

module.exports = controller;