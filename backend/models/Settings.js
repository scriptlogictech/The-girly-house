const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      default: "The Girly House By Manisha",
      trim: true,
    },

    storeDescription: {
      type: String,
      default:
        "Premium Farshi Salwar Suits for elegant women.",
      trim: true,
    },

    contactEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    contactPhone: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    currency: {
      type: String,
      default: "INR",
      trim: true,
    },

    freeShippingThreshold: {
      type: Number,
      default: 999,
      min: 0,
    },

    shippingCharge: {
      type: Number,
      default: 99,
      min: 0,
    },

    enableCOD: {
      type: Boolean,
      default: true,
    },

    enableRazorpay: {
      type: Boolean,
      default: true,
    },

    allowOrderCancellation: {
      type: Boolean,
      default: true,
    },

    cancellationTimeLimit: {
      type: Number,
      default: 24,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Settings",
  settingsSchema
);