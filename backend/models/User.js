const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
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
});

const userSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC USER INFORMATION
    // =========================

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

    // =========================
    // USER ROLE
    // =========================

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    // =========================
    // EMAIL OTP VERIFICATION
    // =========================

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailOtp: {
      type: String,
      default: null,
    },

    emailOtpExpiry: {
      type: Date,
      default: null,
    },

    // =========================
    // PROFILE IMAGE
    // =========================

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

    // =========================
    // ADDITIONAL PROFILE INFO
    // =========================

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    dateOfBirth: {
      type: Date,
    },

    // =========================
    // USER ADDRESSES
    // =========================

    addresses: [addressSchema],

    // =========================
    // ACCOUNT STATUS
    // =========================

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