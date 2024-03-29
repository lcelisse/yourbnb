const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
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
    .isInt({ min: 1, max: 5 })
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
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required")
    .isInt({ min: 1 })
    .withMessage("Must be a positive number"),
  handleValidationErrors,
];

const authorization = async function (req, _res, next) {
  const user = await Spot.findByPk(req.params.spotId, {
    attributes: ["ownerId"],
  });
  if (user) {
    if (req.user.id === user.toJSON().ownerId) {
      return next();
    } else {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
  } else {
    const err = new Error();
    err.title = "Not found";
    err.status = 404;
    err.message = [{ message: "Spot couldn't be found", statusCode: 404 }];
    return next(err);
  }
};
//Get all spots

router.get("/", async (req, res, next) => {
  //spots
  let { page, size } = req.query;
  const pagination = {};

  page = +page;
  size = +size;

  if (!page) page = 1;
  if (!size) size = 20;
  if (size > 20) size = 20;
  if (page > 10) page = 10;

  if (!page > 0) {
    return res
      .json({
        message: "Page must be greater than or equal to 1",
        statusCode: 400,
      })
      .status(400);
  }

  if (!size > 0) {
    return res
      .json({
        message: "Size must be greater than or equal to 1",
        statusCode: 400,
      })
      .status(400);
  }

  if (page > 0 && size > 0) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }
  let query = {
    where: {},
    include: [],
  };

  let errs = {};

  if (req.query.maxPrice < 0) {
    if (+req.query.maxPrice) {
      errs.maxPrice = "Maximum price must be greater than or equal to 0";
    } else {
      query.where.price = {
        [Op.lte]: req.query.maxPrice,
      };
    }
  }

  if (req.query.minPrice < 0) {
    if (+req.query.minPrice) {
      errs.minPrice = "Minimum price must be greater than or equal to 0";
    } else {
      query.where.price = {
        [Op.gte]: req.query.minPrice,
      };
    }
  }

  if (Object.keys(errs).length !== 0) {
    const err = new Error("Validation Error");
    err.status = 400;
    err.errors = errs;
    return next(err);
  }

  const spots = await Spot.findAll({
    ...pagination,
    query,
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
      attributes: ["url"],
      raw: true,
    });

    let spotList = {
      ...spot.dataValues,
      avgRating: Number(review[0].avgRating),
      //fix url error where null = preview image

      previewImage: previewImg,
    };
    spotsList.push(spotList);
  }

  return res.json({ Spots: spotsList, page, size });
});

//all spots of current owner

router.get("/current", requireAuth, async (req, res) => {
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
      attributes: ["url"],
    });

    let spotList = {
      ...spot.dataValues,
      avgRating: Number(review[0].avgRating),
      previewImage: previewImg ? previewImg.url : "none",
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
    const err = new Error();
    err.title = "Not found";
    err.status = 404;
    err.message = [{ message: "Spot couldn't be found", statusCode: 404 }];
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
  const { address, city, state, country, name, description, price } = req.body;

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

    name: name,
    description: description,
    price: price,
  });
  res.json(newSpot);
});

//Add an Image to a Spot based on the Spots Id
router.post(
  "/:spotId/images",
  requireAuth,
  authorization,
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { url, preview } = req.body;

    if (!spot) {
      const err = new Error();
      err.title = "Not found";
      err.status = 404;
      err.message = [{ message: "Spot couldn't be found", statusCode: 404 }];
      return next(err);
    }

    const newImg = await SpotImage.create({
      spotId: req.params.spotId,
      url: url,
      preview: preview,
    });
    res.json({ id: newImg.id, url: newImg.url, preview: newImg.preview });
  }
);

//Edit a Spot
router.put(
  "/:spotId",
  requireAuth,
  validateCreatedSpot,
  authorization,
  async (req, res) => {
    const {
      address,
      city,
      state,
      country,

      name,
      description,
      price,
    } = req.body;

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

      name,
      description,
      price,
    });
    await edited.save();
    return res.json(edited);
  }
);

//Delete a spot
router.delete(
  "/:spotId",
  requireAuth,
  authorization,
  async (req, res, next) => {
    const deletedSpot = await Spot.findByPk(req.params.spotId);
    if (!deletedSpot) {
      const err = new Error();
      err.title = "Not found";
      err.status = 404;
      err.message = [{ message: "Spot couldn't be found", statusCode: 404 }];
      return next(err);
    }

    deletedSpot.destroy();
    return res
      .json({
        message: "Successfully deleted",
        statusCode: 200,
      })
      .statusCode(200);
  }
);

//Get reviews by spot Id

router.get("/:spotId/reviews", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    const err = new Error();
    err.title = "Not found";
    err.status = 404;
    err.message = [{ message: "Spot couldn't be found", statusCode: 404 }];
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
      const err = new Error();
      err.title = "Not found";
      err.status = 404;
      err.message = [{ message: "Spot couldn't be found", statusCode: 404 }];
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
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    const err = new Error();
    err.title = "Not found";
    err.status = 404;
    err.message = [{ message: "Spot couldn't be found", statusCode: 404 }];
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
router.post(
  "/:spotId/bookings",
  requireAuth,
  // notOwner
  async (req, res, next) => {
    const { startDate, endDate } = req.body;
    let newStartTime = new Date(startDate);
    newStartTime = new Date(newStartTime.toDateString()).getTime(); // get rid of hr/min/sec later
    let newEndTime = new Date(endDate);
    newEndTime = new Date(newEndTime.toDateString()).getTime();
    let { spotId } = req.params;
    if (!isNaN(spotId)) spotId = Number(spotId);

    if (newEndTime <= newStartTime) {
      const err = new Error("Validation error");
      err.title = "Validation error";
      err.errors = ["End date cannot be on or before start date"];
      err.status = 400;
      return next(err);
    }

    if (newStartTime < new Date().getTime()) {
      const err = new Error("Validation error");
      err.title = "Validation error";
      err.errors = ["Start date cannot be in the past"];
      err.status = 400;
      return next(err);
    }
    // this conditional should never run because of the validation above
    if (newEndTime < new Date().getTime()) {
      const err = new Error("Validation error");
      err.title = "Validation error";
      err.errors = ["End date cannot be in the past"];
      err.status = 400;
      return next(err);
    }

    const booked = await Booking.findOne({
      where: {
        spotId,
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },

          { endDate: { [Op.between]: [startDate, endDate] } },

          {
            [Op.and]: [
              { startDate: { [Op.gte]: startDate } },
              { endDate: { [Op.lte]: endDate } },
            ],
          },

          {
            [Op.and]: [
              { startDate: { [Op.lte]: startDate } },
              { endDate: { [Op.gte]: endDate } },
            ],
          },
        ],
      },
    });

    if (booked) {
      res.status(403);
      const err = new Error("Validation error");
      err.title = "Validation error";
      err.errors = ["this spot is already booked for the specified dates"];
      err.status = 403;
      return next(err);
    }

    const booking = await Booking.create({
      spotId,
      userId: req.user.id,
      startDate,
      endDate,
    });
    return res.json(booking);
  }
);

module.exports = router;
