'use strict';
const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync('rahasia', 10);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: v4(),
          email: 'superadmin@gmail.com',
          password: password,
          role: 'SUPER_ADMIN',
          status: 'Y',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
