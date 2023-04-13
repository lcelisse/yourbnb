"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "Louise@aa.io",
          username: "Pinkears",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Louise",
          lastName: "Belcher",
        },
        {
          email: "Tina@aa.io",
          username: "Jericho",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Tina",
          lastName: "Belcher",
        },
        {
          email: "Tobin@aa.io",
          username: "Mooon",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Moon",
          lastName: "Tobin",
        },
        {
          email: "Shaw@aa.io",
          username: "Honeybee",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Honeybee",
          lastName: "Shaw",
        },
        {
          email: "Squarepants@aa.io",
          username: "Spongebob",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Spongebob",
          lastName: "Squarepants",
        },
        {
          email: "Cheeks@aa.io",
          username: "Sandy",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Sandy",
          lastName: "Cheeks",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "Pinkears",
            "Jericho",
            "Moon",
            "Honeybee",
            "Spongebob",
            "Sandy",
          ],
        },
      },
      {}
    );
  },
};
