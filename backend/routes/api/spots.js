const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const {
  Spot,
  Review,
  SpotImage,
  User,
  ReviewImage,
  Booking,
} = require("../../db/models");

//Get all spots

router.get("/", async (req, res) => {
  //spots
  const spots = await Spot.findAll();

  return res.json({ Spots: spots });
});

module.exports = router;
