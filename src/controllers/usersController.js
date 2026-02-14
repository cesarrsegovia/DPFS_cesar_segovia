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
        // 1. Traemos a todos los usuarios
        const users = getUsers();

        // 2. Buscamos si existe alguien con el email que escribieron en el formulario
        const userToLogin = users.find(user => user.email === req.body.email);

        if (userToLogin) {
            // 3. Si el correo existe, comparamos la contraseña
            // compareSync toma la contraseña normal (ej: 123456) y la compara con la encriptada
            const isPasswordValid = bcrypt.compareSync(req.body.password, userToLogin.password);

            if (isPasswordValid) {
                // ¡ÉXITO! La contraseña es correcta
                // (Por ahora mostramos un mensaje, luego lo mejoraremos)
                return res.send('¡Bienvenido de nuevo, ' + userToLogin.name + '! 🎉 Login exitoso.');
            }
        }

        // 4. Si el correo no existe o la contraseña es incorrecta
        return res.send('Error: Credenciales inválidas. ❌');
    }
};

module.exports = controller;