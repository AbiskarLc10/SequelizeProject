'use strict';
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        id: 'd0e1f6da-bc11-48c8-92b4-1a9b7b4f07be',  
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('hashedpassword1',10),
        profileImage: 'profile1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '42d11b8b-74d9-4a98-9b88-ff72692449be',  
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('hashedpassword1',10),
        profileImage: 'profile2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '51e5db6c-9b51-459b-85d2-c7db37eb477f',  
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        password: await bcrypt.hash('hashedpassword1',10),
        profileImage: 'profile3.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e1c6f7ac-c522-4723-885d-0bb3d51a4797',  
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        password: await bcrypt.hash('hashedpassword1',10),
        profileImage: 'profile4.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3a746e7b-82f1-40f3-98e2-5adf91a199fe',  
        firstName: 'Charlie',
        lastName: 'Davis',
        email: 'charlie.davis@example.com',
        password: await bcrypt.hash('hashedpassword1',10),
        profileImage: 'profile5.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
