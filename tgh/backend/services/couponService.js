const Coupon = require("../models/Coupon");
const Cart = require("../models/Cart");


const createCoupon = async (body, user) => {
  const {
    code,
    description,
    discountType,
    discountValue,
    minimumOrderAmount,
    maximumDiscount,
    usageLimit,
    startDate,
    expiryDate,
  } = body;

  const couponExists = await Coupon.findOne({
    code: code.toUpperCase(),
  });

  if (couponExists) {
    throw new Error("Coupon already exists.");
  }

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    description,
    discountType,
    discountValue,
    minimumOrderAmount,
    maximumDiscount,
    usageLimit,
    startDate,
    expiryDate,
    createdBy: user._id,
  });

  return {
    success: true,
    message: "Coupon created successfully.",
    data: coupon,
  };
};


const getCoupons = async () => {
  const coupons = await Coupon.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  return {
    success: true,
    data: coupons,
  };
};


const updateCoupon = async (id, body) => {
  const coupon = await Coupon.findById(id);

  if (!coupon) {
    throw new Error("Coupon not found.");
  }

  Object.assign(coupon, body);

  if (body.code) {
    coupon.code = body.code.toUpperCase();
  }

  await coupon.save();

  return {
    success: true,
    message: "Coupon updated successfully.",
    data: coupon,
  };
};


const deleteCoupon = async (id) => {
  const coupon = await Coupon.findById(id);

  if (!coupon) {
    throw new Error("Coupon not found.");
  }

  coupon.isActive = false;

  await coupon.save();

  return {
    success: true,
    message: "Coupon deleted successfully.",
  };
};




const applyCoupon = async (userId, body) => {
  const { code } = body;

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });

  if (!coupon) {
    throw new Error("Invalid coupon.");
  }

  const now = new Date();

  if (now < coupon.startDate) {
    throw new Error("Coupon is not active yet.");
  }

  if (now > coupon.expiryDate) {
    throw new Error("Coupon has expired.");
  }

  if (coupon.usedCount >= coupon.usageLimit) {
    throw new Error("Coupon usage limit reached.");
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty.");
  }

  if (cart.totalAmount < coupon.minimumOrderAmount) {
    throw new Error(
      `Minimum order amount is ₹${coupon.minimumOrderAmount}.`
    );
  }

  let discount = 0;

  if (coupon.discountType === "percentage") {
    discount =
      (cart.totalAmount * coupon.discountValue) / 100;

    if (
      coupon.maximumDiscount > 0 &&
      discount > coupon.maximumDiscount
    ) {
      discount = coupon.maximumDiscount;
    }
  } else {
    discount = coupon.discountValue;
  }

  const finalAmount = Math.max(cart.totalAmount - discount, 0);

  return {
    success: true,
    message: "Coupon applied successfully.",
    data: {
      couponCode: coupon.code,
      cartAmount: cart.totalAmount,
      discount,
      payableAmount: finalAmount,
    },
  };
};


module.exports = {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};