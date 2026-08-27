const express = require("express");

const router = express.Router();

const wishlistController = require("../controllers/wishlistController");
const protect = require("../middleware/authMiddleware");

// ==============================
// Add Product to Wishlist
// ==============================

router.post(
  "/add",
  protect,
  wishlistController.addToWishlist
);

// ==============================
// Get Wishlist
// ==============================

router.get(
  "/",
  protect,
  wishlistController.getWishlist
);

// ==============================
// Remove Product from Wishlist
// ==============================

router.delete(
  "/:productId",
  protect,
  wishlistController.removeFromWishlist
);

module.exports = router;