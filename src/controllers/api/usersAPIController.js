const db = require('../../../models'); // Conectamos a Postgres

const usersAPIController = {
    // Método para listar todos los usuarios
    list: async (req, res) => {
        try {
            // Buscamos todos los usuarios
            const users = await db.User.findAll({
                attributes: ['id', 'name', 'email'] 
            });

            // Creamos la lista mapeada con la URL de detalle
            const usersMapped = users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    detail: `http://localhost:3000/api/users/${user.id}`
                };
            });

            return res.json({
                count: users.length,
                users: usersMapped
            });

        } catch (error) {
            console.error('Error en la API de usuarios:', error);
            return res.status(500).json({ 
                error: 'Hubo un error al conectar con la base de datos' 
            });
        }
    },
    // 👇 2. EL DETALLE 
    detail: async (req, res) => {
        try {
            // Buscamos al usuario por su ID
            const user = await db.User.findByPk(req.params.id, {
                // Excluimos password (por seguridad)
                attributes: { exclude: ['password'] }
            });

            if (user) {
                const userJSON = user.toJSON();
                // Retornamos todas las propiedades e inyectamos la URL de su imagen de perfil
                userJSON.avatar = `http://localhost:3000/img/users/${userJSON.image || 'default-avatar.png'}`;
                
                // Excluimos explícitamente rol por requerimiento si no es parte de la info expuesta
                delete userJSON.rol;

                return res.json(userJSON);
            } else {
                return res.status(404).json({
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