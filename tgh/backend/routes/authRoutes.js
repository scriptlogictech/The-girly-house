const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

// Register User
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify-phone-otp", authController.verifyPhoneOtp);

router.get("/me", protect, authController.getMe);

module.exports = router;