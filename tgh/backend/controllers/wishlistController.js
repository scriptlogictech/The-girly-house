const wishlistService = require("../services/wishlistService");

// Add Product
const addToWishlist = async (req, res) => {
  try {
    const result = await wishlistService.addToWishlist(
      req.user._id,
      req.body.productId
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Wishlist
const getWishlist = async (req, res) => {
  try {
    const result = await wishlistService.getWishlist(req.user._id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Product
const removeFromWishlist = async (req, res) => {
  try {
    const result = await wishlistService.removeFromWishlist(
      req.user._id,
      req.params.productId
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};