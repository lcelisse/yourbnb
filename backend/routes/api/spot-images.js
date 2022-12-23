const express = require("express");
const { SpotImage } = require("../../db/models");
const router = express.Router();

router.delete("/:imageId", async (req, res, next) => {
  const img = await SpotImage.findByPk(req.params.imageId);
  if (!img) {
    const err = new Error();
    err.title = "Not found";
    err.status = 404;
    err.message = [
      { message: "Spot Image couldn't be found", statusCode: 404 },
    ];
    return next(err);
  }

  await img.destroy();

  res
    .json({
      message: "Successfully deleted",
      statusCode: 200,
    })
    .status(200);
});

module.exports = router;
