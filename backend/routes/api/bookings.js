const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, SpotImage, Booking, Sequelize } = require("../../db/models");

//Get all of the Current User's Bookings

router.get("/current", async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    raw: true,
  });
  //fix ordering
  for (let booking of bookings) {
    const spot = await Spot.findOne({
      where: {
        ownerId: req.user.id,
      },
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
      where: {
        preview: true,
        spotId: booking.spotId,
      },
      raw: true,
    });

    spot.previewImg = previewImg.url;
    booking.Spot = spot;
  }

  res.json({ Bookings: bookings });
});

//edit a booking
router.put("/:bookingId", async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(req.params.bookingId);

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }

  //if the endate is before the starting date
  if (end <= start) {
    return res
      .json({
        message: "endDate cannot be on or before startDate",
      })
      .status(400);
  }

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

  booking.set({
    startDate,
    endDate,
  });

  await booking.save();

  res.json(booking);
});

//delete a booking
router.delete("/:bookingId", async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    return res
      .json({
        message: "Booking couldn't be found",
        statusCode: 404,
      })
      .status(404);
  }

  const start = new Date(booking.startDate);
  const now = Date.now();

  if (start < now) {
    return res
      .json({
        message: "Bookings that have been started can't be deleted",
        statusCode: 403,
      })
      .status(403);
  }

  await booking.destroy();
  res
    .json({
      message: "Successfully deleted",
      statusCode: 200,
    })
    .status(200);
});

module.exports = router;
