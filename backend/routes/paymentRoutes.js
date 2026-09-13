const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/authorize");

// =====================================
// Create Razorpay Order
// =====================================

router.post(
  "/create",
  protect,
  authorize("customer"),
  paymentController.createPaymentOrder
);

// =====================================
// Verify Razorpay Payment
// =====================================

router.post(
  "/verify",
  protect,
  authorize("customer"),
  paymentController.verifyPayment
);

module.exports = router;