const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
let JWTsignature = process.env.JWT_SIGNATURE;
router.post("/createuser",
  [
    body("name", "Name must be atleast 3 characters ..!").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email ...!").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, validationError: true, error: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success: false,
          error: "Sorry a user with this email already exists ...!",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed_pswrd = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashed_pswrd,
      });
      const data = {
        user: {
          id: user._id,
        },
      };
      const token = jwt.sign(data, JWTsignature);

      res.status(200).json({ success: true, token });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/login",
  [
    body("email", "Enter a valid email ..!").isEmail(),
    body("password", "Password cannot be blank ..!").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, validationError: true, error: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          error: "Please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success: false,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user._id,
        },
      };
      const token = jwt.sign(data, JWTsignature);
      res.status(200).json({ success: true, token});
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
