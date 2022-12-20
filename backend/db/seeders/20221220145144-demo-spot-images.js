"use strict";
const { Op } = require("sequelize");
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
    await queryInterface.bulkInsert("SpotImages", [
      {
        spotId: 1,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQclJJxQ_0VxErb7I8D3-OtD29Gg3u88dCxXE3rvFPlDDVd5B-ymg1z8Y17YU4TNEgvrGo&usqp=CAU",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS255FTraJEq5EvxDEY7_xqbgeLTHVQSoRg4w&usqp=CAU",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKMi0AK42NcVnTiVBgGuaBmRXCz3pxxWXOPw&usqp=CAU",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5zmbcWJuE7Iq84KWzTzf1Fm9a5CXBbprp3A&usqp=CAU",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfQtgkNkL0dCIDg6du9Iq8JYNx55d2cchIZ9YGmw1cIgsaG160qdltw5QbRIQu2jMg4c0&usqp=CAU",
        preview: true,
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
    await queryInterface.bulkDelete("SpotImages", {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] },
    });
  },
};
