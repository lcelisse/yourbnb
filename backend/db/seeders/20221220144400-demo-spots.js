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
          state: "California",
          country: "United States",

          name: "The Cat House",
          description:
            "A cozy cabin nestled in the woods, surrounded by towering trees and a babbling brook. The cabin features a stone fireplace, hardwood floors, and rustic furnishings.",
          price: 240,
        },
        {
          ownerId: 3,
          address: "2134 Silly St",
          city: "Brooklyn",
          state: "New York",
          country: "United States",

          name: "house of Coziness",
          description:
            "A spacious beach house with panoramic ocean views, decorated with light and airy coastal decor. The house features a wraparound porch, outdoor shower, and a private pool. ",
          price: 236,
        },
        {
          ownerId: 2,
          address: "1223 Angels Ave",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Summer Time vibes",
          description:
            "A charming farmhouse with a wraparound porch, surrounded by lush green fields and a red barn. The house features high ceilings, large windows, and a country-style kitchen. ",
          price: 473,
        },
        {
          ownerId: 3,
          address: "1234 North Pole",
          city: "Manhatten",
          state: "New York",
          country: "United States",

          name: "Winter Wonderland",
          description:
            "A rustic log cabin with a large deck overlooking a secluded mountain valley. The cabin features a stone fireplace, a hot tub, and comfortable furnishings.",
          price: 688,
        },
        {
          ownerId: 1,
          address: "112 Lola St",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Fall vibes",
          description:
            "A Mediterranean-style villa with terracotta tile floors, arched doorways, and a courtyard garden. The villa features a private pool, a pergola-covered terrace, and a large kitchen. ",
          price: 199,
        },
        {
          ownerId: 2,
          address: "112 Lola St",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Fall vibes",
          description:
            "A modern, minimalist apartment with floor-to-ceiling windows, sleek furnishings, and a rooftop terrace. The apartment features a small balcony, a fireplace, and a large living room. ",
          price: 199,
        },
        {
          ownerId: 3,
          address: "112 Lola St",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Fall vibes",
          description:
            "A traditional Victorian home with a wraparound porch, a gazebo, and a large garden. The house features high ceilings, bay windows, and ornate moldings.",
          price: 199,
        },
        {
          ownerId: 1,
          address: "112 Lola St",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Fall vibes",
          description:
            "A mid-century modern home with clean lines, large windows, and a private courtyard. The house features a fireplace, a wet bar, and a large deck. ",
          price: 199,
        },

        {
          ownerId: 2,
          address: "112 Lola St",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Fall vibes",
          description:
            "A Mediterranean-style villa with a red-tiled roof, a large courtyard, and a private pool. The villa features a fireplace, a large living room, and a gourmet kitchen.",
          price: 199,
        },
        {
          ownerId: 3,
          address: "112 Lola St",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Fall vibes",
          description:
            "A spacious ranch-style home with a wraparound porch, a large garden, and a private pool. The house features a fireplace, a large living room, and a large kitchen. ",
          price: 199,
        },
        {
          ownerId: 1,
          address: "112 Lola St",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Fall vibes",
          description:
            "A rustic log cabin with a large deck overlooking a secluded mountain valley. The cabin features a fireplace, a hot tub, and comfortable furnishings.",
          price: 199,
        },
        {
          ownerId: 5,
          address: "112 Lola St",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Fall vibes",
          description:
            "A traditional Victorian home with a wraparound porch, a gazebo, and a large garden. The house features high ceilings, bay windows, and ornate moldings. ",
          price: 199,
        },

        {
          ownerId: 2,
          address: "112 Lola St",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Fall vibes",
          description:
            "A modern, minimalist apartment with floor-to-ceiling windows, sleek furnishings, and a rooftop terrace. The apartment features a small balcony, a fireplace, and a large living room. ",
          price: 199,
        },
        {
          ownerId: 5,
          address: "112 Lola St",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Fall vibes",
          description:
            "A Mediterranean-style villa with terracotta tile floors, arched doorways, and a courtyard garden. The villa features a private pool, a pergola-covered terrace, and a large kitchen. ",
          price: 199,
        },
        {
          ownerId: 4,
          address: "112 Lola St",
          city: "Los Angeles",
          state: "California",
          country: "United States",

          name: "Fall vibes",
          description:
            "A charming farmhouse with a wraparound porch, surrounded by lush green fields and a red barn. The house features high ceilings, large windows, and a country-style kitchen.",
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
