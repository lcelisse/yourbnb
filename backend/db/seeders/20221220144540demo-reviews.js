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

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4] },
    });
  },
};