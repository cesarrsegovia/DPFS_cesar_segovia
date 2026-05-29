'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = bcrypt.hashSync('123456', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@devstyle.com',
        password: hashedPassword,
        rol: 'admin',
        image: 'admin.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Test User',
        email: 'user@devstyle.com',
        password: hashedPassword,
        rol: 'user',
        image: 'user.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Products', [
      {
        name: 'Teclado Mecánico RGB',
        description: 'El teclado definitivo para tu setup. Switches Cherry MX Blue.',
        price: 120.00,
        category: 'perifericos',
        image: 'teclado.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mouse Ergonómico',
        description: 'Mouse inalámbrico de alta precisión con 4000 DPI.',
        price: 55.00,
        category: 'perifericos',
        image: 'mouse.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'T-Shirt Hello World',
        description: 'Remera 100% algodón para programadores.',
        price: 25.00,
        category: 'ropa',
        image: 'remera.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lentes Blue Light',
        description: 'Protege tu vista de la luz azul de los monitores.',
        price: 30.00,
        category: 'accesorios',
        image: 'lentes.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
