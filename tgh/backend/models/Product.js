const mongoose = require("mongoose");

/* =====================================
   Image Schema
===================================== */

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      trim: true,
    },

    altText: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* =====================================
   Size Schema
===================================== */

const sizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "FREE"],
      required: true,
      uppercase: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  }
);

/* =====================================
   Color Schema
===================================== */

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    colorCode: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [imageSchema],
      validate: {
        validator: function (images) {
          return images.length > 0;
        },
        message: "Each color must have at least one image.",
      },
    },

    sizes: {
      type: [sizeSchema],
      validate: {
        validator: function (sizes) {
          return sizes.length > 0;
        },
        message: "Each color must have at least one size.",
      },
    },
  },
  {
    _id: false,
  }
);

/* =====================================
   Product Schema
===================================== */

const productSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // Brand
    brand: {
      type: String,
      default: "The Girly House",
      trim: true,
    },

    // Product Details
    material: {
      type: String,
      default: "",
      trim: true,
    },

    fabric: {
      type: String,
      default: "",
      trim: true,
    },

    fit: {
      type: String,
      default: "",
      trim: true,
    },

    careInstructions: {
      type: String,
      default: "",
      trim: true,
    },

    // Search Tags
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    // Colors & Variants
    colors: {
      type: [colorSchema],
      validate: {
        validator: function (colors) {
          return colors.length > 0;
        },
        message: "Product must have at least one color.",
      },
    },

    // Inventory Summary
    totalStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Ratings
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // Product Status
    isFeatured: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: true,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isTrending: {
  type: Boolean,
  default: false,
},

    // Admin
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);