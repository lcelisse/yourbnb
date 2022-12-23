const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// router.post("/", async (req, res) => {
//   const { firstName, lastName, email, password, username } = req.body;
//   const user = await User.signup({
//     firstName,
//     lastName,
//     email,
//     username,
//     password,
//   });

//   await setTokenCookie(res, user);

//   return res.json({
//     user: user,
//   });
// });

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name"),

  handleValidationErrors,
];

router.post("/", validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;

  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) {
    const err = Error("User already exists");
    err.errors = { email: "User with that email already exists" };
    err.status = 403;
    next(err);
  }

  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) {
    const err = Error("User already exists");
    err.errors = { username: "User with that username already exists" };
    err.status = 403;
    next(err);
  }
  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  let token = await setTokenCookie(res, user);

  return res.json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
      token: token,
    },
  });
});
module.exports = router;
