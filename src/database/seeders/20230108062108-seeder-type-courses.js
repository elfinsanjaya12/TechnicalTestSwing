'use strict';
const { v4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'typeCourses',
      [
        {
          id: v4(),
          name: 'Ebook',
          status: 'Y',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          name: 'Video',
          status: 'Y',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('typeCourses', null, {});
  },
};
