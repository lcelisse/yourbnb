const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {
  Spot,
  Review,
  ReviewImage,
  Booking,
  SpotImage,
  User,
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

//get reviews of the current user
router.get("/current", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
  });

  const reviewsList = [];
  reviews.forEach((reviews) => {
    reviewsList.push(reviews.toJSON());
  });
  for (let reviews of reviewsList) {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "firstName", "lastName"],
    });

    reviews.User = user;

    const spot = await Spot.findOne({
      where: { ownerId: req.user.id },
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "price",
      ],
      raw: true,
    });

    const previewImg = await SpotImage.findOne({
      where: { preview: true, spotId: spot.id },
      raw: true,
    });

    spot.previewImage = previewImg.url;
    reviews.Spot = spot;

    const reviewImg = await ReviewImage.findAll({
      where: {
        reviewId: reviews.id,
      },
      attributes: ["id", "url"],
    });
    reviews.ReviewImages = reviewImg;
  }

  res.json({ Reviews: reviewsList });
});

// edit a review

router.put(
  "/:reviewId",
  requireAuth,
  validateReviews,
  async (req, res, next) => {
    const { review, stars } = req.body;
    const updated = await Review.findByPk(req.params.reviewId);
    const user = await Review.findByPk(req.params.reviewId, {
      attributes: ["userId"],
    });
    if (!updated) {
      res
        .json({ message: "Review couldn't be found", statusCode: 404 })
        .status(404);
    }
    if (req.user.id === user.toJSON().userId) {
      updated.set({
        review,
        stars,
      });

      await updated.save();
      return res.json(updated);
    } else {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
  }
);

//delete a review

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  const user = await Review.findByPk(req.params.reviewId, {
    attributes: ["userId"],
  });
  if (!review) {
    const err = new Error();
    err.title = "Not found";
    err.status = 404;
    err.message = [{ message: "Review couldn't be found", statusCode: 404 }];
    return next(err);
  }
  if (req.user.id === user.toJSON().userId) {
    review.destroy();
    return res
      .json({
        message: "Successfully deleted",
        statusCode: 200,
      })
      .statusCode(200);
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
});

//add an image to a review
router.post("/:reviewId/images", async (req, res, next) => {
  const { url } = req.body;
  const review = await Review.findByPk(req.params.reviewId);
  const user = await Review.findByPk(req.params.reviewId, {
    attributes: ["userId"],
  });
  if (!review) {
    const err = new Error();
    err.title = "Not found";
    err.status = 404;
    err.message = [{ message: "Review couldn't be found", statusCode: 404 }];
    return next(err);
  }
  if (req.user.id === user.toJSON().userId) {
    const reviewImg = await ReviewImage.findAll({
      where: {
        reviewId: req.params.reviewId,
      },
    });
    if (reviewImg > 10) {
      res
        .json({
          message: "Maximum number of images for this resource was reached",
          statusCode: 403,
        })
        .status(403);
    }

    const newImg = await ReviewImage.create({
      reviewId: req.params.reviewId,
      url: url,
    });

    res.json({ id: newImg.id, url: newImg.url });
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
});
module.exports = router;
