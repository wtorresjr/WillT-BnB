const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { checkErrors } = require("../../utils/queryParamsValidator");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

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
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  checkErrors,
];

//SIGN UP NEW-USER
router.post("/", validateSignup, async (req, res) => {
  // router.post("/", async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  try {
    const user = await User.create({
      email,
      username,
      hashedPassword,
      firstName,
      lastName,
    });
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    await setTokenCookie(res, safeUser);
    return res.json({
      user: safeUser,
    });
  } catch (err) {
    const errors = {};
    err.errors.map((err) => {
      errors[err.path] = err.message;
    });

    let custMessage = "";

    if (err.errors[0].validatorKey === "checkIfUnique") {
      custMessage = "User already exists";
      err.status = 500;
    } else {
      custMessage = "Bad Request";
      err.status = 400;
    }

    return res.status(err.status).json({ message: custMessage, errors });
  }
});

module.exports = router;
