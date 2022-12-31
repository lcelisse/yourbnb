const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

const { ReviewImage, Review } = require("../../db/models");

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const reviewImg = await ReviewImage.findByPk(req.params.imageId);
  const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
    attributes: ["reviewId"],
  });
  const review = await Review.findByPk(reviewImage.toJSON().reviewId, {
    attributes: ["userId"],
  });

  if (!reviewImg) {
    const err = new Error();
    err.title = "Not found";
    err.status = 404;
    err.message = [
      { message: "Review Image couldn't be found", statusCode: 404 },
    ];
    return next(err);
  }

  if (req.user.id === review.toJSON().userId) {
    await reviewImg.destroy();
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

module.exports = router;
