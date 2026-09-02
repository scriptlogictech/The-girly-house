const orderService = require("../services/orderService");

// =====================================
// Create Order
// =====================================
const createOrder = async (req, res, next) => {
  try {
    const result = await orderService.createOrder(
      req.user._id,
      req.body
    );

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// =====================================
// Get My Orders
// =====================================
const getMyOrders = async (req, res, next) => {
  try {
    const result = await orderService.getMyOrders(
      req.user._id
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// =====================================
// Get Order By ID
// =====================================
const getOrderById = async (req, res, next) => {
  try {
    const result = await orderService.getOrderById(
      req.params.id,
      req.user._id
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// =====================================
// Cancel Order
// =====================================
const cancelOrder = async (req, res, next) => {
  try {
    const result = await orderService.cancelOrder(
      req.params.id,
      req.user._id
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// =====================================
// Admin - Get All Orders
// =====================================
const getAllOrders = async (req, res, next) => {
  try {
    const result = await orderService.getAllOrders();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// =====================================
// Admin - Update Order Status
// =====================================
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const result = await orderService.updateOrderStatus(
      req.params.id,
      status
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};