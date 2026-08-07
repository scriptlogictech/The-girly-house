const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (userId, body) => {
  const { productId, color, size, quantity } = body;

  const product = await Product.findById(productId);

  if (!product || !product.isActive) {
    throw new Error("Product not found.");
  }

  // Find selected color
  const selectedColor = product.colors.find(
    (c) => c.name.toLowerCase() === color.toLowerCase()
  );

  if (!selectedColor) {
    throw new Error("Color not available.");
  }

  // Find selected size
  const selectedSize = selectedColor.sizes.find(
    (s) => s.size.toUpperCase() === size.toUpperCase()
  );

  if (!selectedSize) {
    throw new Error("Size not available.");
  }

  if (selectedSize.stock < quantity) {
    throw new Error("Insufficient stock.");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) =>
      item.product.toString() === productId &&
      item.color === color &&
      item.size === size
  );

  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    cart.items.push({
      product: product._id,
      color,
      size,
      quantity,
      price: selectedSize.price,
      discountPrice: selectedSize.discountPrice,
    });
  }

  // Recalculate totals
  let subtotal = 0;
  let totalDiscount = 0;
  let totalItems = 0;

  cart.items.forEach((item) => {
    subtotal += item.price * item.quantity;

    totalDiscount +=
      (item.price - item.discountPrice) * item.quantity;

    totalItems += item.quantity;
  });

  cart.subtotal = subtotal;
  cart.totalDiscount = totalDiscount;
  cart.totalAmount = subtotal - totalDiscount;
  cart.totalItems = totalItems;

  await cart.save();

  return {
    success: true,
    message: "Product added to cart successfully.",
    data: cart,
  };
};


const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId })
    .populate("items.product");

  if (!cart) {
    return {
      success: true,
      data: {
        items: [],
        totalItems: 0,
        subtotal: 0,
        totalDiscount: 0,
        totalAmount: 0,
      },
    };
  }

  return {
    success: true,
    data: cart,
  };
};


const updateCartItem = async (userId, itemId, quantity) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found.");
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw new Error("Cart item not found.");
  }

  const product = await Product.findById(item.product);

  if (!product) {
    throw new Error("Product not found.");
  }

  const color = product.colors.find(
    (c) => c.name.toLowerCase() === item.color.toLowerCase()
  );

  if (!color) {
    throw new Error("Color not found.");
  }

  const size = color.sizes.find(
    (s) => s.size.toUpperCase() === item.size.toUpperCase()
  );

  if (!size) {
    throw new Error("Size not found.");
  }

  if (quantity > size.stock) {
    throw new Error("Requested quantity exceeds available stock.");
  }

  item.quantity = quantity;

  let subtotal = 0;
  let totalDiscount = 0;
  let totalItems = 0;

  cart.items.forEach((cartItem) => {
    subtotal += cartItem.price * cartItem.quantity;

    totalDiscount +=
      (cartItem.price - cartItem.discountPrice) * cartItem.quantity;

    totalItems += cartItem.quantity;
  });

  cart.subtotal = subtotal;
  cart.totalDiscount = totalDiscount;
  cart.totalAmount = subtotal - totalDiscount;
  cart.totalItems = totalItems;

  await cart.save();

  return {
    success: true,
    message: "Cart updated successfully.",
    data: cart,
  };
};


const removeCartItem = async (userId, itemId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found.");
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw new Error("Cart item not found.");
  }

  item.deleteOne();

  let subtotal = 0;
  let totalDiscount = 0;
  let totalItems = 0;

  cart.items.forEach((cartItem) => {
    subtotal += cartItem.price * cartItem.quantity;

    totalDiscount +=
      (cartItem.price - cartItem.discountPrice) * cartItem.quantity;

    totalItems += cartItem.quantity;
  });

  cart.subtotal = subtotal;
  cart.totalDiscount = totalDiscount;
  cart.totalAmount = subtotal - totalDiscount;
  cart.totalItems = totalItems;

  await cart.save();

  return {
    success: true,
    message: "Item removed from cart.",
    data: cart,
  };
};


const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found.");
  }

  cart.items = [];
  cart.totalItems = 0;
  cart.subtotal = 0;
  cart.totalDiscount = 0;
  cart.totalAmount = 0;

  await cart.save();

  return {
    success: true,
    message: "Cart cleared successfully.",
  };
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};