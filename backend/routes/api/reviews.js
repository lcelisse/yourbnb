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

router.get("/current", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
  });
  res.json(reviews);
});

module.exports = router;
