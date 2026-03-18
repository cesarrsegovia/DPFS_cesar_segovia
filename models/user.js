'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un usuario puede tener muchos productos (si se implementa en el futuro)
      User.hasMany(models.Product, { foreignKey: 'userId', as: 'products' });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre es obligatorio' },
        len: { args: [3, 100], msg: 'El nombre debe tener entre 3 y 100 caracteres' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Este correo ya está registrado' },
      validate: {
        notEmpty: { msg: 'El email es obligatorio' },
        isEmail: { msg: 'Debe ser un correo electrónico válido' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La contraseña es obligatoria' },
        len: { args: [6, 100], msg: 'La contraseña debe tener al menos 6 caracteres' }
      }
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });
  return User;
};