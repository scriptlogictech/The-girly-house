const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/authorize");

// =====================================
// Customer Routes
// =====================================

// Place Order
router.post(
  "/",
  protect,
  authorize("customer"),
  orderController.createOrder
);

// Get My Orders
router.get(
  "/my-orders",
  protect,
  authorize("customer"),
  orderController.getMyOrders
);

// Get Single Order
router.get(
  "/:id",
  protect,
  authorize("customer"),
  orderController.getOrderById
);

// Cancel Order
router.patch(
  "/:id/cancel",
  protect,
  authorize("customer"),
  orderController.cancelOrder
);

// =====================================
// Admin Routes
// =====================================

// Get All Orders
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  orderController.getAllOrders
);

// Update Order Status
router.patch(
  "/admin/:id/status",
  protect,
  authorize("admin"),
  orderController.updateOrderStatus
);

module.exports = router;