"use strict";
const { Op } = require("sequelize");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
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

  down: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4] },
    });
  },
};
