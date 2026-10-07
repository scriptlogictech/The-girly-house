const express = require("express");

const router = express.Router();

const customerController = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// ==========================================
// ADMIN CUSTOMER ROUTES
// ==========================================

// Customer statistics
router.get(
  "/admin/stats",
  protect,
  authorize("admin"),
  customerController.getCustomerStats
);

// Get all customers
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  customerController.getAllCustomers
);

// Get customer by ID
router.get(
  "/admin/:id",
  protect,
  authorize("admin"),
  customerController.getCustomerById
);

// Block / Unblock customer
router.patch(
  "/admin/:id/status",
  protect,
  authorize("admin"),
  customerController.updateCustomerStatus
);

module.exports = router;