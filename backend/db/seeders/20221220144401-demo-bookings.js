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
    await queryInterface.bulkInsert(
      "Bookings",
      [
        {
          spotId: 1,
          userId: 1,
          startDate: "2022-03-22",
          endDate: "2022-03-27",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2022-03-22",
          endDate: "2022-03-27",
        },
        {
          spotId: 4,
          userId: 5,
          startDate: "2022-03-22",
          endDate: "2022-03-27",
        },
        {
          spotId: 1,
          userId: 2,
          startDate: "2022-03-22",
          endDate: "2022-03-27",
        },
      ],
     
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Bookings", {
      userId: { [Op.in]: [1, 2, 3, 4] },
    });
  },
};
