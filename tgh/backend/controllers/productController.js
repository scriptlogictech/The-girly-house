const productService = require("../services/productService");

// Create Product
const createProduct = async (req, res) => {
  try {
    const result = await productService.createProduct(
      req.body,
      req.files,
      req.user
    );

    res.status(201).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts(req.query);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Product By Slug
const getProductBySlug = async (req, res) => {
  try {
    const result = await productService.getProductBySlug(
      req.params.slug
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ⭐ NEW - Get Product By ID
const getProductById = async (req, res) => {
  try {
    const result = await productService.getProductById(
      req.params.id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const result = await productService.updateProduct(
      req.params.id,
      req.body,
      req.files
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(
      req.params.id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Trending Products
const getTrendingProducts = async (req, res) => {
  try {
    const result = await productService.getTrendingProducts();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getNewArrivalProducts = async (req, res) => {
  try {
    const result =
      await productService.getNewArrivalProducts();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductBySlug,
  getProductById,
  updateProduct,
  deleteProduct,
  getTrendingProducts,
  getNewArrivalProducts,
};