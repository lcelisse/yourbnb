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
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Demo",
          lastName: "User",
        },
        {
          email: "user1@user.io",
          username: "Demo",
          hashedPassword: bcrypt.hashSync("password2"),
          firstName: "Demo",
          lastName: "Lition",
        },
        {
          email: "ser2@user.io",
          username: "JohnDoe",
          hashedPassword: bcrypt.hashSync("password3"),
          firstName: "John",
          lastName: "Doe",
        },
        {
          email: "celi@user.io",
          username: "celisse",
          hashedPassword: bcrypt.hashSync("password7"),
          firstName: "Celi",
          lastName: "Hidalgo",
        },
        {
          email: "teemo@user.io",
          username: "teemothecat",
          hashedPassword: bcrypt.hashSync("password9"),
          firstName: "Teemo",
          lastName: "Cat",
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
            "Demo-lition",
            "FakeUser1",
            "FakeUser2",
            "celisse",
            "teemothecat",
          ],
        },
      },
      {}
    );
  },
};
