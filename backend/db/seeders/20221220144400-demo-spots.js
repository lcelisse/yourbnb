"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "1344 Teemo st",
          city: "Los Angeles",
          state: "CA",
          country: "USA",
          lat: 34.076691,
          lng: -118.242766,
          name: "The cat house",
          description: "coziest house youll ever stay in ",
          price: 125,
        },
        {
          ownerId: 3,
          address: "2134 silly st",
          city: "Brooklyn",
          state: "NY",
          country: "USA",
          lat: 34.053691,
          lng: -118.242846,
          name: "house of coziness",
          description: "coziest house youll ever stay in ",
          price: 236,
        },
        {
          ownerId: 2,
          address: "1223 angels ave",
          city: "Los Angeles",
          state: "Ca",
          country: "USA",
          lat: 65.053691,
          lng: -118.242766,
          name: "Summer time vibes",
          description: "coziest house youll ever stay in ",
          price: 473,
        },
        {
          ownerId: 3,
          address: "1234 North Pole",
          city: "Manhatten",
          state: "NY",
          country: "USA",
          lat: 34.053691,
          lng: -108.242766,
          name: "winter wonderland",
          description: "coziest house youll ever stay in ",
          price: 688,
        },
        {
          ownerId: 1,
          address: "112 lola st",
          city: "Los Angeles",
          state: "Ca",
          country: "USA",
          lat: 34.0536571,
          lng: -118.242986,
          name: "Fall vibes",
          description: "coziest house youll ever stay in ",
          price: 199,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] },
    });
  },
};
