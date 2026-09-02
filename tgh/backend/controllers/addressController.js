const addressService = require("../services/addressService");

// Add Address
const addAddress = async (req, res) => {
  try {
    const result = await addressService.addAddress(req.user._id, req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Addresses
const getAddresses = async (req, res) => {
  try {
    const result = await addressService.getAddresses(req.user._id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Address
const updateAddress = async (req, res) => {
  try {
    const result = await addressService.updateAddress(
      req.user._id,
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

// Delete Address
const deleteAddress = async (req, res) => {
  try {
    const result = await addressService.deleteAddress(
      req.user._id,
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

// Set Default Address
const setDefaultAddress = async (req, res) => {
  try {
    const result = await addressService.setDefaultAddress(
      req.user._id,
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

module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};