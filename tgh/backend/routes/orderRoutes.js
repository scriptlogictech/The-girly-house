const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// =====================================
// customer Routes
// =====================================

// Place Order
router.post(
  "/",
  protect,
  authorize("customer"),
  orderController.createOrder
);

router.get(
  "/my-orders",
  protect,
  authorize("customer"),
  orderController.getMyOrders
);

router.get(
  "/:id",
  protect,
  authorize("customer"),
  orderController.getOrderById
);

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