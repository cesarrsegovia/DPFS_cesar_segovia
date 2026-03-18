'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un producto pertenece a un usuario (creador/admin que lo subió)
      Product.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre es obligatorio' },
        len: { args: [3, 100], msg: 'El nombre debe tener entre 3 y 100 caracteres' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La descripción es obligatoria' }
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El precio es obligatorio' },
        min: { args: [0], msg: 'El precio debe ser mayor o igual a 0' }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La categoría es obligatoria' }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'default-image.png'
    }
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: true
  });
  return Product;
};