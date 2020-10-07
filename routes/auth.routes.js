const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// REGISTRATION
// /api/auth/register
router.post(
  "/register",
  // Validation
  [
    check("email", "Email is incorrect").normalizeEmail().isEmail(),
    check("password", "Password must have at least 6 characters")
      .exists()
      .isLength({
        min: 6,
      }),
  ],
  async (req, res) => {
    try {
      // Validation results
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          massage: "Incorrect registration data",
          errors: validationErrors.array(),
        });
      }

      const { email, password } = req.body;
      //console.log(req.body);

      // check if user already exist
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "The user already exist" });
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "New user was successfully created" });
    } catch (error) {
      res.status(500).json({ message: "ERROR: Something wrong !" });
    }
  }
);

// LOGIN
// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Email is not valid").normalizeEmail().isEmail(),
    check("password", "Password must have at least 6 characters")
      .exists()
      .isLength({
        min: 6,
      }),
  ],
  async (req, res) => {
    try {
      //console.log(req.body);
      // Validation results
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          massage: "Incorrect login data",
          errors: validationErrors.array(),
        });
      }

      const { email, password } = req.body;

      // check if email exist
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "User or password is incorrect. Plaese try again" });
      }

      //check if the password is correct
      const isPsswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPsswordCorrect) {
        return res
          .status(400)
          .json({ message: "User or password is incorrect. Plaese try again" });
      }

      // return to user JWT-token
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token, userId: user.id });
      //return res.status(200).json({ message: "You are logged in!" });
    } catch (error) {
      res.status(500).json({ massage: "ERROR: Something wrong !" });
    }
  }
);

module.exports = router;
