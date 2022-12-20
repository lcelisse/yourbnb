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
          spotId: 1,
          userId: 1,
          startDate: "2022-03-22",
          endDate: "2022-03-27",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2022-04-22",
          endDate: "2022-04-27",
        },
        {
          spotId: 4,
          userId: 5,
          startDate: "2022-05-22",
          endDate: "2022-05-27",
        },
        {
          spotId: 1,
          userId: 2,
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
