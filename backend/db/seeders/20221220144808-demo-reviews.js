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
      "Reviews",
      [
        {
          spotId: 3,
          userId: 2,
          review:
            "Had a great experience with the home. Was the perfect size for a gathering.",
          stars: 4,
        },
        {
          spotId: 5,
          userId: 4,
          review:
            "The people next door were very noisy. It was hard to enjoy my vacation thats was supposed to be me time",
          stars: 2,
        },
        {
          spotId: 2,
          userId: 1,
          review:
            "Had a great experience with the home. It had a lot of good resturants and nice night life near by",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 3,
          review: "ive stayed at better hotels. it was okay",
          stars: 3,
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
    await queryInterface.bulkDelete("Reviews");
  },
};
