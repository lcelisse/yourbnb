const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

const { ReviewImage } = require("../../db/models");

router.delete("/:imageId", requireAuth, async (req, res) => {
  const reviewImg = await ReviewImage.findByPk(req.params.imageId);

  if (!reviewImg) {
    const err = new Error("Review Image couldn't be found");
    err.status = 404;
    return next(err);
  }

  await reviewImg.destroy();
  return res
    .json({
      message: "Successfully deleted",
      statusCode: 200,
    })
    .statusCode(200);
});

module.exports = router;
