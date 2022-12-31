const express = require("express");
const { SpotImage, Spot } = require("../../db/models");
const router = express.Router();

router.delete("/:imageId", async (req, res, next) => {
  const img = await SpotImage.findByPk(req.params.imageId);
  const spot = await SpotImage.findByPk(req.params.imageId, {
    attributes: ["spotId"],
  });

  if (img) {
    const user = await Spot.findByPk(spot.toJSON().spotId, {
      attributes: ["ownerId"],
    });
    if (req.user.id === user.toJSON().ownerId) {
      await img.destroy();

      res
        .json({
          message: "Successfully deleted",
          statusCode: 200,
        })
        .status(200);
    } else {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
  } else {
    const err = new Error();
    err.title = "Not found";
    err.status = 404;
    err.message = [
      { message: "Spot Image couldn't be found", statusCode: 404 },
    ];
    return next(err);
  }
});

module.exports = router;
