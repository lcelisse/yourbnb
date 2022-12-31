"use strict";
const { Op } = require("sequelize");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 2,
          spotId: 3,

          review:
            "Had a great experience with the home. Was the perfect size for a gathering.",
          stars: 4,
        },
        {
          userId: 4,
          spotId: 5,

          review:
            "The people next door were very noisy. It was hard to enjoy my vacation thats was supposed to be me time",
          stars: 2,
        },
        {
          userId: 1,
          spotId: 2,

          review:
            "Had a great experience with the home. It had a lot of good resturants and nice night life near by",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 3,

          review: "ive stayed at better hotels. it was okay",
          stars: 3,
        },
        {
          userId: 1,
          spotId: 1,

          review: ":)",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 4,

          review: "perfect stay",
          stars: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4] },
    });
  },
};
