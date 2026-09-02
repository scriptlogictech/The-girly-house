const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
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

    addressType: {
      type: String,
      enum: ["home", "work", "other"],
      default: "home",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  // {
  //   _id: false,
  // }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    phoneOtp: {
      type: String,
      default: null,
    },

    phoneOtpExpiry: {
      type: Date,
      default: null,
    },

    profileImage: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    dateOfBirth: {
      type: Date,
    },

    addresses: [addressSchema],

    status: {
      type: String,
      enum: ["active", "blocked", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);