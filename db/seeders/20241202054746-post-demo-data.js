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
     */

    await queryInterface.bulkInsert("Posts", [
      {
        id: uuidv4(),
        title: "Demo-post-1",
        content: "This is demo post number 1",
        user_id: "1be609b8-1fe7-41d1-bbdc-78f63fe50e36",
        postImage: "/demo-post1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: "Demo-post-2",
        content: "This is demo post number 2",
        user_id: "1be609b8-1fe7-41d1-bbdc-78f63fe50e36",
        postImage: "/demo-post2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: "Demo-post-3",
        content: "This is demo post number 3",
        user_id: "1be609b8-1fe7-41d1-bbdc-78f63fe50e36",
        postImage: "/demo-post3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: "Demo-post-4",
        content: "This is demo post number 4",
        user_id: "1be609b8-1fe7-41d1-bbdc-78f63fe50e36",
        postImage: "/demo-post4.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Posts", {
      attribute: {
        user_id: "1be609b8-1fe7-41d1-bbdc-78f63fe50e36",
      },
    });
  },
};
