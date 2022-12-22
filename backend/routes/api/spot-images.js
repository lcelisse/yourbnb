const express = require("express");
const { SpotImage } = require("../../db/models");
const router = express.Router();

router.delete("/:imageId", async (req, res) => {
  const img = await SpotImage.findByPk(req.params.imageId);
  if (!img) {
    return res
      .json({
        message: "Spot Image couldn't be found",
        statusCode: 404,
      })
      .status(404);
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
