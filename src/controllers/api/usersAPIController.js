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
    }
};

module.exports = usersAPIController;