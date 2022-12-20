"use strict";
const { Op } = require("sequelize");
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
    await queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "1344 Teemo st",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.076691,
        lng: -118.242766,
        name: "The cat house",
        descript: "coziest house youll ever stay in ",
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
        descript: "coziest house youll ever stay in ",
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
        descript: "coziest house youll ever stay in ",
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
        descript: "coziest house youll ever stay in ",
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
        descript: "coziest house youll ever stay in ",
        price: 199,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Spots", {
      ownerId: { [Op.in]: [1, 2, 3, 4] },
    });
  },
};
