"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     *
     */

    await queryInterface.bulkInsert("Posts", [
      {
        id: uuidv4(),
        title: "Post-100",
        content: "This is post 101",
        user_id: '430f9f68-65b5-4c33-b0fc-74474cbe3da2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Posts',{
      user_id: '430f9f68-65b5-4c33-b0fc-74474cbe3da2'
    },{})
  },
};
