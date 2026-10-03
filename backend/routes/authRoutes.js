const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// ==========================================
// AUTH ROUTES
// ==========================================

// Register User
router.post("/register", authController.register);

// Login User
router.post("/login", authController.login);

// Verify Email OTP
router.post(
  "/verify-email-otp",
  authController.verifyEmailOtp
);

// Get Logged-in User
router.get("/me", protect, authController.getMe);

module.exports = router;