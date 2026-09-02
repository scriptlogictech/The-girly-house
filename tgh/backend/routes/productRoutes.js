const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const upload = require("../middleware/upload");

// =======================
// Public Routes
// =======================

// Get All Products
router.get(
  "/",
  productController.getAllProducts
);

// Get Trending Products
router.get(
  "/trending",
  productController.getTrendingProducts
);

// Get New Arrival Products
router.get(
  "/new-arrivals",
  productController.getNewArrivalProducts
);

// =======================
// Admin Route
// Get Product By ID
// IMPORTANT: Keep this ABOVE /:slug
// =======================

router.get(
  "/id/:id",
  protect,
  authorize("admin"),
  productController.getProductById
);

// =======================
// Public Route
// Get Product By Slug
// IMPORTANT: KEEP THIS LAST
// =======================

router.get(
  "/:slug",
  productController.getProductBySlug
);

// =======================
// Admin Routes
// =======================

// Create Product
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.any(),
  productController.createProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.any(),
  productController.updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  productController.deleteProduct
);

module.exports = router;