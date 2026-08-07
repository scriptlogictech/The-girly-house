const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// ======================
// Public Routes
// ======================

// Get All Categories
router.get("/", categoryController.getAllCategories);

// Get Single Category by Slug
router.get("/:slug", categoryController.getCategoryBySlug);

// ======================
// Admin Routes
// ======================

// Create Category
router.post(
  "/",
  protect,
  authorize("admin"),
  categoryController.createCategory
);

// Update Category
router.put(
  "/:id",
  protect,
  authorize("admin"),
  categoryController.updateCategory
);

// Delete Category
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  categoryController.deleteCategory
);

module.exports = router;