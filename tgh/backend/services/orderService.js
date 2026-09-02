const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");
const User = require("../models/User");



const createOrder = async (userId, orderData) => {
  const { addressId, couponCode, paymentMethod } = orderData;

  // ===========================
  // Find User
  // ===========================
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  // ===========================
  // Get Cart
  // ===========================
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty.");
  }

  // ===========================
  // Find Address
  // ===========================
  const address = user.addresses.id(addressId);

  if (!address) {
    throw new Error("Address not found.");
  }

  // ===========================
  // Build Order Items
  // ===========================
  const orderItems = [];

  let subtotal = 0;

  for (const item of cart.items) {
    const product = item.product;

    if (!product || !product.isActive) {
      throw new Error("Product not available.");
    }

    // Find Color
    const color = product.colors.find(
      (c) => c.name === item.color
    );

    if (!color) {
      throw new Error(`Color ${item.color} not found.`);
    }

    // Find Size
    const size = color.sizes.find(
      (s) => s.size === item.size
    );

    if (!size) {
      throw new Error(`Size ${item.size} not found.`);
    }

    // Check Stock
    if (size.stock < item.quantity) {
      throw new Error(`${product.name} is out of stock.`);
    }

    subtotal += item.discountPrice * item.quantity;

    orderItems.push({
      product: product._id,
      productName: product.name,
      image: color.images[0]?.url || "",
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      discountPrice: item.discountPrice,
    });
  }

  // ===========================
  // Coupon
  // ===========================
  let discount = 0;
  let coupon = null;

  if (couponCode) {
    coupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      throw new Error("Invalid coupon.");
    }

    if (coupon.expiryDate < new Date()) {
      throw new Error("Coupon expired.");
    }

    if (subtotal < coupon.minimumOrderAmount) {
      throw new Error("Minimum order amount not reached.");
    }

    if (coupon.discountType === "percentage") {
      discount = subtotal * (coupon.discountValue / 100);

      if (
        coupon.maximumDiscount &&
        discount > coupon.maximumDiscount
      ) {
        discount = coupon.maximumDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }
  }

  // ===========================
  // Shipping
  // ===========================
  const shippingCharge = subtotal >= 999 ? 0 : 99;

  const totalAmount = subtotal - discount + shippingCharge;

// ===========================
// Generate Order Number
// ===========================
const orderNumber =
  "GH" +
  Date.now() +
  Math.floor(1000 + Math.random() * 9000);

// ===========================
// Create Order
// ===========================
const order = await Order.create({
  user: userId,

  orderNumber,

  items: orderItems,

  shippingAddress: address,

  coupon: coupon?._id || null,

  subtotal,

  discount,

  shippingCharge,

  totalAmount,

  paymentMethod,
});

  // ===========================
  // Reduce Stock
  // ===========================
  for (const item of cart.items) {
    const product = await Product.findById(item.product);

    const color = product.colors.find(
      (c) => c.name === item.color
    );

    const size = color.sizes.find(
      (s) => s.size === item.size
    );

    size.stock -= item.quantity;

    product.totalStock -= item.quantity;

    await product.save();
  }

  // ===========================
  // Increase Coupon Usage
  // ===========================
  if (coupon) {
    coupon.usedCount += 1;
    await coupon.save();
  }

  // ===========================
  // Clear Cart
  // ===========================
  cart.items = [];
  cart.subtotal = 0;
  cart.totalDiscount = 0;
  cart.totalAmount = 0;
  cart.totalItems = 0;

  await cart.save();

  return {
    success: true,
    message: "Order placed successfully.",
    data: order,
  };
};

const getMyOrders = async (userId) => {
  const orders = await Order.find({
    user: userId,
  })
    .sort({ createdAt: -1 })
    .populate("coupon", "code");

  return {
    success: true,
    total: orders.length,
    data: orders,
  };
};


const getOrderById = async (orderId, userId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  })
    .populate("user", "name email phone")
    .populate("coupon", "code");

  if (!order) {
    throw new Error("Order not found.");
  }

  return {
    success: true,
    data: order,
  };
};



const cancelOrder = async (orderId, userId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  if (
    ["Shipped", "Delivered", "Cancelled"].includes(order.orderStatus)
  ) {
    throw new Error("Order cannot be cancelled.");
  }

  // Restore Stock
  for (const item of order.items) {
    const product = await Product.findById(item.product);

    if (!product) continue;

    const color = product.colors.find(
      (c) => c.name === item.color
    );

    if (!color) continue;

    const size = color.sizes.find(
      (s) => s.size === item.size
    );

    if (!size) continue;

    size.stock += item.quantity;
    product.totalStock += item.quantity;

    await product.save();
  }

  // Restore Coupon Usage
  if (order.coupon) {
    const coupon = await Coupon.findById(order.coupon);

    if (coupon && coupon.usedCount > 0) {
      coupon.usedCount -= 1;
      await coupon.save();
    }
  }

  order.orderStatus = "Cancelled";
  order.isCancelled = true;

  await order.save();

  return {
    success: true,
    message: "Order cancelled successfully.",
  };
};



const getAllOrders = async () => {
  const orders = await Order.find()
    .populate("user", "name email phone")
    .populate("coupon", "code")
    .sort({ createdAt: -1 });

  return {
    success: true,
    total: orders.length,
    data: orders,
  };
};


const updateOrderStatus = async (orderId, status) => {
  const allowedStatus = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid order status.");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found.");
  }

  order.orderStatus = status;

  if (status === "Delivered") {
    order.paymentStatus = "Paid";
  }

  await order.save();

  return {
    success: true,
    message: "Order status updated successfully.",
    data: order,
  };
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};