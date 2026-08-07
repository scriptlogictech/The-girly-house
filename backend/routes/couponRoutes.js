const express = require("express");
const router = express.Router();

const couponController = require("../controllers/couponController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// Admin
router.post("/", protect, authorize("admin"), couponController.createCoupon);

router.get("/", protect, authorize("admin"), couponController.getCoupons);

router.put("/:id", protect, authorize("admin"), couponController.updateCoupon);

router.delete("/:id", protect, authorize("admin"), couponController.deleteCoupon);

// Customer
router.post(
  "/apply",
  protect,
  couponController.applyCoupon
);

module.exports = router;