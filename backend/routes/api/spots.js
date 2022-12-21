const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const {
  Spot,
  Review,
  SpotImage,
  User,
  ReviewImage,
  Booking,
  Sequelize,
} = require("../../db/models");
const spot = require("../../db/models/spot");

//Get all spots

router.get("/", async (req, res) => {
  //spots
  const spots = await Spot.findAll();

  const spotsList = [];
  // get avg ratings
  for (let spot of spots) {
    const review = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
      raw: true,
    });

    //include preview image
    const previewImg = await SpotImage.findOne({
      where: { preview: true, spotId: spot.id },
    });

    let spotList = {
      ...spot.dataValues,
      avgRating: Number(review[0].avgRating),
      previewImage: previewImg.url,
    };
    spotsList.push(spotList);
  }

  return res.json({ Spots: spotsList });
});

//all spots of current owner

router.get("/current", async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
  });
  const spotsList = [];
  // get avg ratings
  for (let spot of spots) {
    const review = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
      raw: true,
    });

    //include preview image
    const previewImg = await SpotImage.findOne({
      where: { preview: true, spotId: spot.id },
    });

    let spotList = {
      ...spot.dataValues,
      avgRating: Number(review[0].avgRating),
      previewImage: previewImg.url,
    };
    spotsList.push(spotList);
  }

  return res.json({ Spots: spotsList });
});

module.exports = router;
