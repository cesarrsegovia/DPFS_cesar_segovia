const db = require('../../../models'); // Conectamos a Postgres

const usersAPIController = {
    // Método para listar todos los usuarios
    list: async (req, res) => {
        try {
            // Buscamos todos los usuarios, PERO le decimos a Sequelize que SOLO traiga id, nombre y email.
            const users = await db.User.findAll({
                attributes: ['id', 'name', 'email'] 
            });

            // En lugar de res.render(), usamos res.json() para devolver datos crudos
            return res.json({
                meta: {
                    status: 200,
                    count: users.length,
                    url: '/api/users'
                },
                data: users
            });

        } catch (error) {
            console.error('Error en la API de usuarios:', error);
            return res.status(500).json({ 
                meta: { status: 500 },
                error: 'Hubo un error al conectar con la base de datos' 
            });
        }
    },
    // 👇 2. EL DETALLE 
    detail: async (req, res) => {
        try {
            // Buscamos al usuario por su ID (el que viene en la URL)
            const user = await db.User.findByPk(req.params.id, {
                // Le decimos a Postgres: "Tráeme todo EXCEPTO el password y el rol" (Por seguridad)
                attributes: { exclude: ['password', 'rol'] }
            });

            // Si el usuario existe, lo enviamos en JSON
            if (user) {
                return res.json({
                    meta: {
                        status: 200,
                        url: `/api/users/${req.params.id}`
                    },
                    data: user
                });
            } else {
                // Si ponen un ID que no existe (ej: /api/users/999)
                return res.status(404).json({
                    meta: { status: 404 },
                    error: 'Usuario no encontrado'
                });
            }

        } catch (error) {
            console.error('Error en el detalle de usuario:', error);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
    }
};

module.exports = usersAPIController;