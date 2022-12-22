const express = require("express");
const router = express.Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const { restoreUser } = require("../../utils/auth.js");
const spotRouter = require("./spots.js");
const reviewsRouter = require("./reviews.js");
const bookingRouter = require("./bookings.js");
const spotImagerouter = require("./spot-images.js");
const reviewImgRouter = require('./review-images')
router.use(restoreUser);

// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);
router.use("/spots", spotRouter);
router.use("/reviews", reviewsRouter);
router.use("/bookings", bookingRouter);
router.use("/spot-images", spotImagerouter);
router.use("/review-images", reviewImgRouter)
// router.post("/test", (req, res) => {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
