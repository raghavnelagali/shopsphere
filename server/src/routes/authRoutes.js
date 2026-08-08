const express = require("express");
const protect = require("../middlewares/protect");

const router = express.Router();

const {
    registerUser,
    loginUser,
    profileUser,
} = require("../controllers/authController");

const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");

const validate = require("../middlewares/validate");

router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);

router.get("/profile", protect, profileUser);

module.exports = router;