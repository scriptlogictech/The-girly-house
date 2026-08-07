const cartService = require("../services/cartService");

// Add to Cart
const addToCart = async (req, res) => {
  console.log("====== ADD TO CART ======");
  console.log("User:", req.user);
  console.log("Body:", req.body);

  try {
    const result = await cartService.addToCart(req.user._id, req.body);

    console.log("Cart added successfully");

    res.status(200).json(result);
  } catch (error) {
    console.error("Cart Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const result = await cartService.getCart(req.user._id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Quantity
const updateCartItem = async (req, res) => {
  try {
    const result = await cartService.updateCartItem(
      req.user._id,
      req.params.itemId,
      req.body.quantity
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Item
const removeCartItem = async (req, res) => {
  try {
    const result = await cartService.removeCartItem(
      req.user._id,
      req.params.itemId
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Clear Cart
const clearCart = async (req, res) => {
  try {
    const result = await cartService.clearCart(req.user._id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};