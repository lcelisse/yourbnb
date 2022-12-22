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
const validateReviews = [
  check("stars")
    .exists({ checkFalsy: true })
    .withMessage("Stars must be an integer from 1 to 5"),
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  handleValidationErrors,
];

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
      raw: true,
    });

    let spotList = {
      ...spot.dataValues,
      avgRating: Number(review[0].avgRating),
      //fix url error where null = preview image
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

//Edit a Spot
router.put("/:spotId", requireAuth, validateCreatedSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const edited = await Spot.findByPk(req.params.spotId);
  if (!edited) {
    res
      .json({ message: "Spot couldn't be found", statusCode: 404 })
      .status(404);
  }
  edited.set({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  await edited.save();
  return res.json(edited);
});

//Delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const deletedSpot = await Spot.findByPk(req.params.spotId);
  if (!deletedSpot) {
    res
      .json({ message: "Spot couldn't be found", statusCode: 404 })
      .status(404);
  }

  deletedSpot.destroy();
  return res
    .json({
      message: "Successfully deleted",
      statusCode: 200,
    })
    .statusCode(200);
});

//Get reviews by spot Id

router.get("/:spotId/reviews", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  res.json({ Reviews: reviews });
});

//create a review for a spot based on the spots id
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReviews,
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { review, stars } = req.body;

    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }

    const reviews = await Review.findAll({
      where: {
        spotId: req.params.spotId,
      },
      raw: true,
    });

    for (let review of reviews) {
      if (review.userId === req.user.id) {
        const err = new Error("User already has a review for this spot");
        err.status = 403;
        return next(err);
      }
    }

    const newReview = await Review.create({
      userId: req.user.id,
      spotId: req.params.spotId,
      review: review,
      stars: stars,
    });
    res.json(newReview);
  }
);

//bookings by spot id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (spot.ownerId !== req.user.id) {
    const bookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
      attributes: ["spotId", "startDate", "endDate"],
    });
    res.json({ Booking: bookings });
  } else {
    const bookings = await Booking.findAll({
      //fix ordering
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      where: {
        spotId: req.params.spotId,
      },
    });
    res.json({ Booking: bookings });
  }
});

//create a booking from a spot based on spot id
router.post("/:spotId/bookings", async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  //if the endate is before the starting date
  if (end <= start) {
    return res
      .json({
        message: "endDate cannot be on or before startDate",
      })
      .status(400);
  }

  //if the dates are already booked
  const bookings = await Booking.findAll({
    where: {
      spotId: req.params.spotId,
    },
    raw: true,
  });
  for (let booking of bookings) {
    let { startDate, endDate } = booking;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (start >= startDate && start <= endDate) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      err.errors = ["Start date conflicts with an existing booking"];
      return next(err);
    }
    if (end >= startDate && end <= endDate) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      err.errors = ["Start date conflicts with an existing booking"];
      return next(err);
    }
  }

  const newBooking = await Booking.create({
    spotId: req.params.spotId,
    userId: req.user.id,
    startDate: startDate,
    endDate: endDate,
  });
  res.json(newBooking);
});

module.exports = router;
