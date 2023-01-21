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
          userId: 3,
          spotId: 1,

          review:
            "This was the perfect getaway spot for our family. The house was beautifully decorated, and had everything we needed for a comfortable stay.",
          stars: 1,
        },
        {
          userId: 1,
          spotId: 3,

          review:
            "We had a wonderful time at this Airbnb. The location was perfect, and the host was very friendly and accommodating.",
          stars: 3,
        },
        {
          userId: 5,
          spotId: 1,

          review:
            "We loved our stay at this Airbnb. The place was spotless and the location was perfect for our visit to the city.",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 12,

          review:
            "This was the perfect place for our group of friends to stay for a weekend getaway. The house was spacious and had everything we needed.",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 11,

          review:
            "The location of this Airbnb was perfect for our needs, and the host was very responsive and helpful.",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 7,

          review:
            "We had an amazing time at this Airbnb. The house was beautiful and the host was very welcoming and accommodating.",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 14,

          review:
            "This was the perfect place for our family to stay while we explored the city. The house was clean and comfortable, and the host was very friendly.",
          stars: 3,
        },
        {
          userId: 4,
          spotId: 9,

          review:
            "Our stay at this Airbnb was fantastic. The house was beautiful and the location was perfect for our needs.",
          stars: 3,
        },
        {
          userId: 5,
          spotId: 11,

          review:
            "We had a great time at this Airbnb. The house was clean and comfortable, and the host was very responsive to our needs.",
          stars: 4,
        },
        {
          userId: 4,
          spotId: 1,

          review:
            "This was the perfect place for our group of friends to stay for a weekend getaway. The house was spacious and had everything we needed.",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 15,

          review:
            "We had a wonderful time at this Airbnb. The location was perfect, and the host was very friendly and accommodating.",
          stars: 3,
        },
        {
          userId: 5,
          spotId: 8,

          review:
            "We loved our stay at this Airbnb. The place was spotless and the location was perfect for our visit to the city.",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 15,

          review:
            "This was the perfect getaway spot for our family. The house was beautifully decorated, and had everything we needed for a comfortable stay.",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 6,

          review:
            "The location of this Airbnb was perfect for our needs, and the host was very responsive and helpful.",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 15,

          review:
            "We had an amazing time at this Airbnb. The house was beautiful and the host was very welcoming and accommodating.",
          stars: 4,
        },
        {
          userId: 1,
          spotId: 3,

          review:
            "This was the perfect place for our family to stay while we explored the city. The house was clean and comfortable, and the host was very friendly.",
          stars: 3,
        },
        {
          userId: 1,
          spotId: 4,

          review:
            "Our stay at this Airbnb was fantastic. The house was beautiful and the location was perfect for our needs.",
          stars: 4,
        },
        {
          userId: 1,
          spotId: 11,

          review:
            "We had a great time at this Airbnb. The house was clean and comfortable, and the host was very responsive to our needs.",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 8,

          review:
            "This was the perfect place for our group of friends to stay for a weekend getaway. The house was spacious and had everything we needed.",
          stars: 2,
        },
        {
          userId: 2,
          spotId: 15,

          review:
            "We had a wonderful time at this Airbnb. The location was perfect, and the host was very friendly and accommodating.",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 12,

          review:
            "We loved our stay at this Airbnb. The place was spotless and the location was perfect for our visit to the city.",
          stars: 1,
        },
        {
          userId: 3,
          spotId: 13,

          review:
            "This was the perfect getaway spot for our family. The house was beautifully decorated, and had everything we needed for a comfortable stay.",
          stars: 2,
        },
        {
          userId: 3,
          spotId: 6,

          review:
            "The location of this Airbnb was perfect for our needs, and the host was very responsive and helpful.",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 8,

          review:
            "We had an amazing time at this Airbnb. The house was beautiful and the host was very welcoming and accommodating.",
          stars: 1,
        },
        {
          userId: 1,
          spotId: 2,

          review:
            "This was the perfect place for our family to stay while we explored the city. The house was clean and comfortable, and the host was very friendly.",
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
