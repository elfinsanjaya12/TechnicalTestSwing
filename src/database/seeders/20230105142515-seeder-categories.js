'use strict';
const { v4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: v4(),
          name: 'UI & UX',
          status: 'Y',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          name: 'PHP',
          status: 'Y',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          name: 'Javascript',
          status: 'Y',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
