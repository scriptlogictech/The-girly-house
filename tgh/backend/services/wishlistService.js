const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// Add Product
const addToWishlist = async (userId, productId) => {
  const product = await Product.findById(productId);

  if (!product || !product.isActive) {
    throw new Error("Product not found.");
  }

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      products: [],
    });
  }

  const alreadyExists = wishlist.products.some(
    (id) => id.toString() === productId
  );

  if (alreadyExists) {
    throw new Error("Product already exists in wishlist.");
  }

  wishlist.products.push(productId);

  await wishlist.save();

  return {
    success: true,
    message: "Product added to wishlist successfully.",
    data: wishlist,
  };
};

// Get Wishlist
const getWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId }).populate({
    path: "products",
    populate: {
      path: "category",
      select: "name slug",
    },
  });

  if (!wishlist) {
    return {
      success: true,
      data: {
        products: [],
      },
    };
  }

  return {
    success: true,
    data: wishlist,
  };
};

// Remove Product
const removeFromWishlist = async (userId, productId) => {
  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    throw new Error("Wishlist not found.");
  }

  wishlist.products = wishlist.products.filter(
    (id) => id.toString() !== productId
  );

  await wishlist.save();

  return {
    success: true,
    message: "Product removed from wishlist.",
    data: wishlist,
  };
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};