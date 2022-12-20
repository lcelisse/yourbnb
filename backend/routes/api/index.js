const express = require("express");
const router = express.Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const { restoreUser } = require("../../utils/auth.js");
const spotRouter = require("./spots.js");

router.use(restoreUser);

// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);
router.use("/spots", spotRouter);
// router.post("/test", (req, res) => {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
