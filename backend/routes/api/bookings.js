const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, SpotImage, Booking, Sequelize } = require("../../db/models");

//Get all of the Current User's Bookings

router.get("/current", requireAuth, async (req, res) => {
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
      include: [
        {
          model: SpotImage,
          attributes: ["url"],
        },
      ],
      raw: true,
    });
    if (booking.length === 0) {
      return res.json({
        message: "No bookings for current spot",
      });
    }

    booking.Spot = spot;
  }

  res.json({ Bookings: bookings });
});

//edit a booking
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(req.params.bookingId);
  const user = await Booking.findByPk(req.params.bookingId, {
    attributes: ["userId"],
  });

  if (!booking) {
    const err = new Error();
    err.title = "Not found";
    err.status = 404;
    err.message = [{ message: "Booking couldn't be found", statusCode: 404 }];
    return next(err);
  }
  if (req.user.id === user.toJSON().userId) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    //if the endate is before the starting date
    if (end <= start) {
      const err = new Error();
      err.title = "Validation error";
      err.status = 400;
      err.message = "Validation error";
      err.errors = {
        endDate: "endDate cannot come before startDate",
        statusCode: 400,
      };
      return next(err);
    }

    const bookings = await Booking.findAll({
      where: {
        spotId: booking.spotId,
      },
      raw: true,
    });
    for (let booking of bookings) {
      let { startDate, endDate } = booking;
      startDate = new Date(startDate);
      endDate = new Date(endDate);

      if (start >= startDate && start <= endDate) {
        const err = new Error();
        err.title = "Booking Error";
        err.status = 403;
        err.message =
          "Sorry, this spot is already booked for the specified dates";
        err.errors = {
          startDate: "Start date conflicts with an existing booking",
          statusCode: 403,
        };

        return next(err);
      }
      if (end >= startDate && end <= endDate) {
        const err = new Error();
        err.title = "Booking Error";
        err.status = 403;
        err.message =
          "Sorry, this spot is already booked for the specified dates";
        err.errors = {
          endDate: "End date conflicts with an existing booking",
          statusCode: 403,
        };
        return next(err);
      }
    }

    booking.set({
      startDate,
      endDate,
    });

    await booking.save();

    res.json(booking);
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
});

//delete a booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  const user = await Booking.findByPk(req.params.bookingId, {
    attributes: ["userId"],
  });
  if (!booking) {
    const err = new Error();
    err.title = "Not found";
    err.status = 404;
    err.message = [{ message: "Booking couldn't be found", statusCode: 404 }];
    return next(err);
  }

  if (req.user.id === user.toJSON().userId) {
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
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
});

module.exports = router;
