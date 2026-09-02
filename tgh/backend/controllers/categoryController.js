const categoryService = require("../services/categoryService");

// Create Category
const createCategory = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body, req.user);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const result = await categoryService.getAllCategories();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Category By Slug
const getCategoryBySlug = async (req, res) => {
  try {
    const result = await categoryService.getCategoryBySlug(req.params.slug);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const result = await categoryService.updateCategory(
      req.params.id,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};