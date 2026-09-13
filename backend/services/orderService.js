const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");
const User = require("../models/User");

// =====================================================
// BUILD ORDER DATA
// =====================================================

const buildOrderData = async (userId, orderData) => {
  const {
    addressId,
    couponCode,
    buyNowItem,
  } = orderData;

  // ===================================================
  // FIND USER
  // ===================================================

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  // ===================================================
  // FIND ADDRESS
  // ===================================================

  const address = user.addresses.id(addressId);

  if (!address) {
    throw new Error("Address not found.");
  }

  // ===================================================
  // BUILD ORDER ITEMS
  // ===================================================

  const orderItems = [];

  let subtotal = 0;

  // ===================================================
  // BUY NOW
  // ===================================================

  if (buyNowItem) {
    const {
      productId,
      color: selectedColor,
      size: selectedSize,
      quantity,
    } = buyNowItem;

    if (!productId) {
      throw new Error("Product is required.");
    }

    if (!selectedColor) {
      throw new Error("Color is required.");
    }

    if (!selectedSize) {
      throw new Error("Size is required.");
    }

    if (!quantity || quantity <= 0) {
      throw new Error("Invalid quantity.");
    }

    const product =
      await Product.findById(productId);

    if (!product || !product.isActive) {
      throw new Error(
        "Product not available."
      );
    }

    // ===============================================
    // FIND COLOR
    // ===============================================

    const color =
      product.colors.find(
        (c) =>
          c.name === selectedColor
      );

    if (!color) {
      throw new Error(
        `Color ${selectedColor} not found.`
      );
    }

    // ===============================================
    // FIND SIZE
    // ===============================================

    const size =
      color.sizes.find(
        (s) =>
          s.size === selectedSize
      );

    if (!size) {
      throw new Error(
        `Size ${selectedSize} not found.`
      );
    }

    // ===============================================
    // STOCK
    // ===============================================

    if (size.stock < quantity) {
      throw new Error(
        `${product.name} is out of stock.`
      );
    }

    // ===============================================
    // PRICE
    // ===============================================

    const price =
      size.price || 0;

    const discountPrice =
      size.discountPrice > 0
        ? size.discountPrice
        : price;

    subtotal =
      discountPrice * quantity;

    // ===============================================
    // ORDER ITEM
    // ===============================================

    orderItems.push({
      product:
        product._id,

      productName:
        product.name,

      image:
        color.images[0]?.url || "",

      color:
        selectedColor,

      size:
        selectedSize,

      quantity,

      price,

      discountPrice,
    });
  }

  // ===================================================
  // NORMAL CART CHECKOUT
  // ===================================================

  else {
    const cart =
      await Cart.findOne({
        user: userId,
      }).populate(
        "items.product"
      );

    if (
      !cart ||
      cart.items.length === 0
    ) {
      throw new Error(
        "Cart is empty."
      );
    }

    for (
      const item of cart.items
    ) {
      const product =
        item.product;

      if (
        !product ||
        !product.isActive
      ) {
        throw new Error(
          "Product not available."
        );
      }

      // =============================================
      // FIND COLOR
      // =============================================

      const color =
        product.colors.find(
          (c) =>
            c.name === item.color
        );

      if (!color) {
        throw new Error(
          `Color ${item.color} not found.`
        );
      }

      // =============================================
      // FIND SIZE
      // =============================================

      const size =
        color.sizes.find(
          (s) =>
            s.size === item.size
        );

      if (!size) {
        throw new Error(
          `Size ${item.size} not found.`
        );
      }

      // =============================================
      // STOCK
      // =============================================

      if (
        size.stock <
        item.quantity
      ) {
        throw new Error(
          `${product.name} is out of stock.`
        );
      }

      // =============================================
      // CURRENT PRODUCT PRICE
      // =============================================

      const itemPrice =
        size.price || 0;

      const itemDiscountPrice =
        size.discountPrice > 0
          ? size.discountPrice
          : itemPrice;

      subtotal +=
        itemDiscountPrice *
        item.quantity;

      // =============================================
      // ORDER ITEM
      // =============================================

      orderItems.push({
        product:
          product._id,

        productName:
          product.name,

        image:
          color.images[0]?.url ||
          "",

        color:
          item.color,

        size:
          item.size,

        quantity:
          item.quantity,

        price:
          itemPrice,

        discountPrice:
          itemDiscountPrice,
      });
    }
  }

  // ===================================================
  // COUPON
  // ===================================================

  let discount = 0;

  let coupon = null;

  if (couponCode) {
    coupon =
      await Coupon.findOne({
        code:
          couponCode.toUpperCase(),

        isActive: true,
      });

    if (!coupon) {
      throw new Error(
        "Invalid coupon."
      );
    }

    if (
      coupon.expiryDate &&
      coupon.expiryDate <
        new Date()
    ) {
      throw new Error(
        "Coupon expired."
      );
    }

    if (
      subtotal <
      coupon.minimumOrderAmount
    ) {
      throw new Error(
        "Minimum order amount not reached."
      );
    }

    if (
      coupon.discountType ===
      "percentage"
    ) {
      discount =
        subtotal *
        (coupon.discountValue /
          100);

      if (
        coupon.maximumDiscount &&
        discount >
          coupon.maximumDiscount
      ) {
        discount =
          coupon.maximumDiscount;
      }
    } else {
      discount =
        coupon.discountValue;
    }

    // Prevent negative total.
    if (discount > subtotal) {
      discount = subtotal;
    }
  }

  // ===================================================
  // SHIPPING
  // ===================================================

  const shippingCharge =
    subtotal >= 999
      ? 0
      : 99;

  // ===================================================
  // TOTAL
  // ===================================================

  const totalAmount =
    subtotal -
    discount +
    shippingCharge;

  // ===================================================
  // RETURN CALCULATION
  // ===================================================

  return {
    user,

    address,

    orderItems,

    subtotal,

    discount,

    shippingCharge,

    totalAmount,

    coupon,

    isBuyNow:
      Boolean(buyNowItem),
  };
};

// =====================================================
// GET ORDER CALCULATION
// =====================================================

const getOrderCalculation = async (
  userId,
  orderData
) => {
  const {
    subtotal,
    discount,
    shippingCharge,
    totalAmount,
  } = await buildOrderData(
    userId,
    orderData
  );

  return {
    subtotal,
    discount,
    shippingCharge,
    totalAmount,
  };
};

// =====================================================
// GENERATE ORDER NUMBER
// =====================================================

const generateOrderNumber = () => {
  return (
    "GH" +
    Date.now() +
    Math.floor(
      1000 +
        Math.random() * 9000
    )
  );
};

// =====================================================
// REDUCE STOCK
// =====================================================

const reduceStock = async (
  orderItems
) => {
  for (
    const item of orderItems
  ) {
    const product =
      await Product.findById(
        item.product
      );

    if (!product) {
      throw new Error(
        `${item.productName} is no longer available.`
      );
    }

    const color =
      product.colors.find(
        (c) =>
          c.name === item.color
      );

    if (!color) {
      throw new Error(
        `Color ${item.color} not found.`
      );
    }

    const size =
      color.sizes.find(
        (s) =>
          s.size === item.size
      );

    if (!size) {
      throw new Error(
        `Size ${item.size} not found.`
      );
    }

    // Re-check stock.
    if (
      size.stock <
      item.quantity
    ) {
      throw new Error(
        `${item.productName} is out of stock.`
      );
    }

    size.stock -=
      item.quantity;

    product.totalStock =
      Math.max(
        0,
        (product.totalStock || 0) -
          item.quantity
      );

    await product.save();
  }
};

// =====================================================
// RESTORE STOCK
// =====================================================

const restoreStock = async (
  orderItems
) => {
  for (
    const item of orderItems
  ) {
    const product =
      await Product.findById(
        item.product
      );

    if (!product) {
      continue;
    }

    const color =
      product.colors.find(
        (c) =>
          c.name === item.color
      );

    if (!color) {
      continue;
    }

    const size =
      color.sizes.find(
        (s) =>
          s.size === item.size
      );

    if (!size) {
      continue;
    }

    size.stock +=
      item.quantity;

    product.totalStock =
      (product.totalStock || 0) +
      item.quantity;

    await product.save();
  }
};

// =====================================================
// CLEAR CART
// =====================================================

const clearUserCart = async (
  userId
) => {
  const cart =
    await Cart.findOne({
      user: userId,
    });

  if (!cart) {
    return;
  }

  cart.items = [];

  cart.subtotal = 0;

  cart.totalDiscount = 0;

  cart.totalAmount = 0;

  cart.totalItems = 0;

  await cart.save();
};

// =====================================================
// INCREASE COUPON USAGE
// =====================================================

const increaseCouponUsage = async (
  coupon
) => {
  if (!coupon) {
    return;
  }

  coupon.usedCount =
    (coupon.usedCount || 0) +
    1;

  await coupon.save();
};

// =====================================================
// DECREASE COUPON USAGE
// =====================================================

const decreaseCouponUsage = async (
  couponId
) => {
  if (!couponId) {
    return;
  }

  const coupon =
    await Coupon.findById(
      couponId
    );

  if (
    coupon &&
    coupon.usedCount > 0
  ) {
    coupon.usedCount -= 1;

    await coupon.save();
  }
};

// =====================================================
// CREATE FINAL ORDER
// =====================================================

const createFinalOrder = async ({
  userId,
  orderData,
  paymentStatus = "Pending",
  paymentId = "",
  razorpayOrderId = "",
  orderStatus = "Pending",
}) => {
  const {
    address,
    orderItems,
    subtotal,
    discount,
    shippingCharge,
    totalAmount,
    coupon,
    isBuyNow,
  } = await buildOrderData(
    userId,
    orderData
  );

  // ===================================================
  // CREATE ORDER
  // ===================================================

  const order =
    await Order.create({
      user: userId,

      orderNumber:
        generateOrderNumber(),

      items:
        orderItems,

      isBuyNow,

      shippingAddress:
        address,

      coupon:
        coupon?._id || null,

      subtotal,

      discount,

      shippingCharge,

      totalAmount,

      paymentMethod:
        orderData.paymentMethod,

      paymentStatus,

      paymentId,

      razorpayOrderId,

      orderStatus,
    });

  // ===================================================
  // REDUCE STOCK
  // ===================================================

  await reduceStock(
    orderItems
  );

  // ===================================================
  // COUPON USAGE
  // ===================================================

  await increaseCouponUsage(
    coupon
  );

  // ===================================================
  // CLEAR CART
  // ===================================================

  if (!isBuyNow) {
    await clearUserCart(
      userId
    );
  }

  return {
    success: true,

    message:
      "Order placed successfully.",

    data: order,
  };
};

// =====================================================
// CREATE COD ORDER
// =====================================================

const createOrder = async (
  userId,
  orderData
) => {
  const paymentMethod =
    orderData.paymentMethod ||
    "COD";

  if (
    paymentMethod === "COD"
  ) {
    return createFinalOrder({
      userId,

      orderData,

      paymentStatus:
        "Pending",

      paymentId: "",

      razorpayOrderId: "",

      orderStatus:
        "Confirmed",
    });
  }

  if (
    paymentMethod ===
    "RAZORPAY"
  ) {
    throw new Error(
      "For Razorpay orders, payment must be completed first."
    );
  }

  throw new Error(
    "Invalid payment method."
  );
};

// =====================================================
// CREATE PENDING RAZORPAY ORDER
// =====================================================

const createPendingRazorpayOrder =
  async ({
    userId,
    orderData,
    razorpayOrderId,
  }) => {
    if (!razorpayOrderId) {
      throw new Error(
        "Razorpay order ID is required."
      );
    }

    const {
      address,
      orderItems,
      subtotal,
      discount,
      shippingCharge,
      totalAmount,
      coupon,
      isBuyNow,
    } = await buildOrderData(
      userId,
      orderData
    );

    // ===============================================
    // CREATE PENDING ORDER
    // ===============================================

    const order =
      await Order.create({
        user: userId,

        orderNumber:
          generateOrderNumber(),

        items:
          orderItems,

        isBuyNow,

        shippingAddress:
          address,

        coupon:
          coupon?._id || null,

        subtotal,

        discount,

        shippingCharge,

        totalAmount,

        paymentMethod:
          "RAZORPAY",

        paymentStatus:
          "Pending",

        paymentId: "",

        razorpayOrderId,

        orderStatus:
          "Pending",
      });

    return {
      success: true,

      message:
        "Pending Razorpay order created.",

      data: order,
    };
  };

// =====================================================
// GET PENDING RAZORPAY ORDER
// =====================================================

const getRazorpayPendingOrder =
  async ({
    userId,
    razorpayOrderId,
  }) => {
    if (!razorpayOrderId) {
      throw new Error(
        "Razorpay order ID is required."
      );
    }

    const order =
      await Order.findOne({
        user: userId,

        razorpayOrderId,

        paymentMethod:
          "RAZORPAY",

        paymentStatus:
          "Pending",
      });

    if (!order) {
      throw new Error(
        "Pending Razorpay order not found."
      );
    }

    return {
      success: true,

      data: order,
    };
  };

// =====================================================
// COMPLETE RAZORPAY ORDER
// =====================================================

const completeRazorpayOrder =
  async ({
    userId,
    razorpayOrderId,
    razorpayPaymentId,
  }) => {
    if (!razorpayOrderId) {
      throw new Error(
        "Razorpay order ID is required."
      );
    }

    if (!razorpayPaymentId) {
      throw new Error(
        "Razorpay payment ID is required."
      );
    }

    // ===============================================
    // FIND PENDING ORDER
    // ===============================================

    const order =
      await Order.findOne({
        user: userId,

        razorpayOrderId,

        paymentMethod:
          "RAZORPAY",
      });

    if (!order) {
      throw new Error(
        "Razorpay order not found."
      );
    }

    // ===============================================
    // DUPLICATE PAYMENT
    // ===============================================

    if (
      order.paymentStatus ===
      "Paid"
    ) {
      return {
        success: true,

        message:
          "Payment was already completed.",

        data: order,
      };
    }

    if (
      order.paymentStatus ===
      "Refunded"
    ) {
      throw new Error(
        "This order has already been refunded."
      );
    }

    // ===============================================
    // STOCK CHECK
    // ===============================================

    for (
      const item of order.items
    ) {
      const product =
        await Product.findById(
          item.product
        );

      if (
        !product ||
        !product.isActive
      ) {
        throw new Error(
          `${item.productName} is no longer available.`
        );
      }

      const color =
        product.colors.find(
          (c) =>
            c.name === item.color
        );

      if (!color) {
        throw new Error(
          `Color ${item.color} is no longer available.`
        );
      }

      const size =
        color.sizes.find(
          (s) =>
            s.size === item.size
        );

      if (!size) {
        throw new Error(
          `Size ${item.size} is no longer available.`
        );
      }

      if (
        size.stock <
        item.quantity
      ) {
        throw new Error(
          `${item.productName} is out of stock.`
        );
      }
    }

    // ===============================================
    // REDUCE STOCK
    // ===============================================

    await reduceStock(
      order.items
    );

    // ===============================================
    // COUPON USAGE
    // ===============================================

    if (order.coupon) {
      const coupon =
        await Coupon.findById(
          order.coupon
        );

      if (coupon) {
        coupon.usedCount =
          (coupon.usedCount || 0) +
          1;

        await coupon.save();
      }
    }

    // ===============================================
    // CLEAR CART
    // ===============================================

    if (!order.isBuyNow) {
      await clearUserCart(
        userId
      );
    }

    // ===============================================
    // UPDATE PAYMENT
    // ===============================================

    order.paymentStatus =
      "Paid";

    order.paymentId =
      razorpayPaymentId;

    order.orderStatus =
      "Confirmed";

    await order.save();

    return {
      success: true,

      message:
        "Payment verified and order confirmed.",

      data: order,
    };
  };

// =====================================================
// GET MY ORDERS
// =====================================================

const getMyOrders = async (
  userId
) => {
  const orders =
    await Order.find({
      user: userId,
    })
      .sort({
        createdAt: -1,
      })
      .populate(
        "coupon",
        "code"
      );

  return {
    success: true,

    total:
      orders.length,

    data: orders,
  };
};

// =====================================================
// GET ORDER BY ID
// =====================================================

const getOrderById = async (
  orderId,
  userId
) => {
  const order =
    await Order.findOne({
      _id: orderId,

      user: userId,
    })
      .populate(
        "user",
        "name email phone"
      )
      .populate(
        "coupon",
        "code"
      );

  if (!order) {
    throw new Error(
      "Order not found."
    );
  }

  return {
    success: true,

    data: order,
  };
};

// =====================================================
// CANCEL ORDER
// =====================================================

const cancelOrder = async (
  orderId,
  userId
) => {
  const order =
    await Order.findOne({
      _id: orderId,

      user: userId,
    });

  if (!order) {
    throw new Error(
      "Order not found."
    );
  }

  if (
    [
      "Shipped",
      "Delivered",
      "Cancelled",
    ].includes(
      order.orderStatus
    )
  ) {
    throw new Error(
      "Order cannot be cancelled."
    );
  }

  // ===============================================
  // RESTORE STOCK
  // ===============================================

  await restoreStock(
    order.items
  );

  // ===============================================
  // RESTORE COUPON
  // ===============================================

  await decreaseCouponUsage(
    order.coupon
  );

  // ===============================================
  // UPDATE ORDER
  // ===============================================

  order.orderStatus =
    "Cancelled";

  order.isCancelled =
    true;

  /*
   * Razorpay refund logic will be
   * added separately later.
   */

  await order.save();

  return {
    success: true,

    message:
      "Order cancelled successfully.",
  };
};

// =====================================================
// ADMIN - GET ALL ORDERS
// =====================================================

const getAllOrders = async () => {
  const orders =
    await Order.find()
      .populate(
        "user",
        "name email phone"
      )
      .populate(
        "coupon",
        "code"
      )
      .sort({
        createdAt: -1,
      });

  return {
    success: true,

    total:
      orders.length,

    data: orders,
  };
};

// =====================================================
// ADMIN - UPDATE ORDER STATUS
// =====================================================

const updateOrderStatus =
  async (
    orderId,
    status
  ) => {
    const allowedStatus = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (
      !allowedStatus.includes(
        status
      )
    ) {
      throw new Error(
        "Invalid order status."
      );
    }

    const order =
      await Order.findById(
        orderId
      );

    if (!order) {
      throw new Error(
        "Order not found."
      );
    }

    order.orderStatus =
      status;

    // COD becomes paid when delivered.
    //
    // Razorpay orders are already paid
    // after successful payment verification.

    if (
      status === "Delivered" &&
      order.paymentMethod ===
        "COD"
    ) {
      order.paymentStatus =
        "Paid";
    }

    await order.save();

    return {
      success: true,

      message:
        "Order status updated successfully.",

      data: order,
    };
  };

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  createOrder,

  createPendingRazorpayOrder,

  getRazorpayPendingOrder,

  completeRazorpayOrder,

  getOrderCalculation,

  finalizeRazorpayOrder:
    completeRazorpayOrder,

  getMyOrders,

  getOrderById,

  cancelOrder,

  getAllOrders,

  updateOrderStatus,
};