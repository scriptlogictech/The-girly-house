const customerService = require("../services/customerService");

// ==========================================
// GET ALL CUSTOMERS
// ==========================================

const getAllCustomers = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await customerService.getAllCustomers();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET CUSTOMER BY ID
// ==========================================

const getCustomerById = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await customerService.getCustomerById(
        req.params.id
      );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// UPDATE CUSTOMER STATUS
// ==========================================

const updateCustomerStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } = req.body;

    const result =
      await customerService.updateCustomerStatus(
        req.params.id,
        status
      );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// CUSTOMER STATS
// ==========================================

const getCustomerStats = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await customerService.getCustomerStats();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  updateCustomerStatus,
  getCustomerStats,
};