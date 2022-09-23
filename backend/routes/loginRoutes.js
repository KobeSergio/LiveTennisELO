const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUser,
  loginUser,
} = require("../controller/loginController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(loginUser); 

module.exports = router;
