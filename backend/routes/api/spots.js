const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
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

const validateCreatedSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

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

//Create Spot

router.post("/", requireAuth, validateCreatedSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  });

  const newSpot = await Spot.create({
    ownerId: user.id,
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price,
  });
  res.json(newSpot);
});

//Add an Image to a Spot based on the Spots Id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const { url, preview } = req.body;

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  const newImg = await SpotImage.create({
    spotId: req.params.spotId,
    url: url,
    preview: preview,
  });
  res.json({ id: newImg.id, url: newImg.url, preview: newImg.preview });
});

module.exports = router;
