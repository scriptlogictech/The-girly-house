const couponService = require("../services/couponService");

const createCoupon = async (req, res) => {
  try {
    const result = await couponService.createCoupon(req.body, req.user);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCoupons = async (req, res) => {
  try {
    const result = await couponService.getCoupons();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const result = await couponService.updateCoupon(
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

const deleteCoupon = async (req, res) => {
  try {
    const result = await couponService.deleteCoupon(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const applyCoupon = async (req, res) => {
  try {
    const result = await couponService.applyCoupon(req.user._id, req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};