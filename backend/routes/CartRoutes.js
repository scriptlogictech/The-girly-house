const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware");

// Add to Cart
router.post("/", protect, cartController.addToCart);

// Get Cart
router.get("/", protect, cartController.getCart);

// Update Cart Item Quantity
router.put("/:itemId", protect, cartController.updateCartItem);

// Remove Cart Item
router.delete("/:itemId", protect, cartController.removeCartItem);

// Clear Cart
router.delete("/", protect, cartController.clearCart);

module.exports = router;