"use strict";

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
      "ReviewImages",
      [
        {
          reviewId: 1,
          url: "insert soon",
        },
        {
          reviewId: 2,
          url: "insert soon",
        },
        {
          reviewId: 3,
          url: "insert soon",
        },
        {
          reviewId: 4,
          url: "insert soon",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("ReviewImages");
  },
};
