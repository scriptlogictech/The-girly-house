const mongoose = require("mongoose");

// ==============================
// Order Item Schema
// ==============================
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    size: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

// ==============================
// Shipping Address Schema
// ==============================
const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    house: {
      type: String,
      required: true,
      trim: true,
    },

    street: {
      type: String,
      required: true,
      trim: true,
    },

    landmark: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

// ==============================
// Order Schema
// ==============================
const orderSchema = new mongoose.Schema(
  {
    // ==========================
    // User
    // ==========================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ==========================
    // Order Number
    // ==========================
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },

    // ==========================
    // Order Items
    // ==========================
    items: {
      type: [orderItemSchema],
      required: true,
    },

    // ==========================
    // Buy Now Flag
    // ==========================
    // true  = Buy Now checkout
    // false = Normal cart checkout
    isBuyNow: {
      type: Boolean,
      default: false,
    },

    // ==========================
    // Shipping Address
    // ==========================
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },

    // ==========================
    // Coupon
    // ==========================
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },

    // ==========================
    // Price Details
    // ==========================
    subtotal: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // ==========================
    // Payment Method
    // ==========================
    paymentMethod: {
      type: String,
      enum: ["COD", "RAZORPAY"],
      default: "COD",
    },

    // ==========================
    // Payment Status
    // ==========================
    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
        "Refunded",
      ],
      default: "Pending",
    },

    // ==========================
    // Razorpay Payment ID
    // ==========================
    paymentId: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================
    // Razorpay Order ID
    // ==========================
    // Example:
    // order_xxxxxxxxxxxxx
    razorpayOrderId: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================
    // Order Status
    // ==========================
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    // ==========================
    // Delivery
    // ==========================
    deliveredAt: {
      type: Date,
    },

    // ==========================
    // Cancellation
    // ==========================
    cancelledAt: {
      type: Date,
    },

    cancellationReason: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================
    // Notes
    // ==========================
    notes: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================
    // Cancelled Flag
    // ==========================
    isCancelled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ==============================
// Indexes
// ==============================

// Helps us quickly find a Razorpay
// order during payment verification.
orderSchema.index({
  razorpayOrderId: 1,
});

// Helps retrieve user's orders.
orderSchema.index({
  user: 1,
  createdAt: -1,
});

// ==============================
// Export
// ==============================
module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );