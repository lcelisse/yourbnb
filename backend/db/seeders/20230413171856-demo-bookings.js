"use strict";

const { Op } = require("sequelize");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          spotId: 2,

          startDate: "2022-03-22",
          endDate: "2022-03-27",
        },
        {
          userId: 3,
          spotId: 8,

          startDate: "2022-04-22",
          endDate: "2022-04-27",
        },
        {
          userId: 5,
          spotId: 4,

          startDate: "2022-05-22",
          endDate: "2022-05-27",
        },
        {
          userId: 2,
          spotId: 1,

          startDate: "2022-06-22",
          endDate: "2022-06-27",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 5] },
    });
  },
};
