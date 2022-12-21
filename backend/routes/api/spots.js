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

//Get details for a spot from an id

router.get("/:spotId", async (req, res, next) => {
  //get spot
  //   const { spotId } = req.params;
  const spot = await Spot.findByPk(req.params.spotId, {
    raw: true,
  });

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
  // number of reviews and average of stars
  const reviews = await Review.findAll({
    where: {
      spotId: spot.id,
    },
    attributes: ["review", "stars"],
    raw: true,
  });

  let sum = 0;
  let total = reviews.length;
  for (let review of reviews) {
    sum += review.stars;
  }

  spot.numReviews = reviews.length;
  spot.avgStarRating = sum / total;

  const spotImgs = await SpotImage.findAll({
    where: {
      preview: true,
      spotId: req.params.spotId,
    },
    attributes: ["id", "url", "preview"],
  });

  spot.SpotImages = spotImgs;

  const owner = await User.findOne({
    where: {
      id: spot.ownerId,
    },
    attributes: ["id", "firstName", "lastName"],
  });

  spot.Owner = owner;

  res.json(spot);
});
module.exports = router;
