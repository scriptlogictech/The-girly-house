const Product = require("../models/Product");
const Category = require("../models/Category");

const generateSlug = require("../utils/generateSlug");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const createProduct = async (productData, files, loggedInUser) => {
  const {
    name,
    shortDescription,
    description,
    category,
    brand,
    material,
    fabric,
    fit,
    careInstructions,
    tags,
    colors,
    isTrending,
    isFeatured,
    isNewArrival,
    isBestSeller,
  } = productData;

  // Check Category
  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    throw new Error("Category not found.");
  }

  // Generate Slug
  const slug = generateSlug(name);

  // Check Duplicate Product
  const productExists = await Product.findOne({ slug });

  if (productExists) {
    throw new Error("Product already exists.");
  }

  // Upload Images
  const uploadedImages = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const image = await uploadToCloudinary(
        file.buffer,
        "girly-house/products"
      );

      uploadedImages.push({
        url: image.secure_url,
        publicId: image.public_id,
        altText: name,
      });
    }
  }

  // Parse Colors JSON
  let parsedColors = [];

  if (colors) {
    parsedColors = JSON.parse(colors);
  }

  // Assign Uploaded Images
  parsedColors = parsedColors.map((color) => ({
    ...color,
    images: uploadedImages,
  }));

  // Calculate Total Stock
  let totalStock = 0;

  parsedColors.forEach((color) => {
    color.sizes.forEach((size) => {
      totalStock += Number(size.stock);
    });
  });

  // Create Product
  const product = await Product.create({
    name,
    slug,
    shortDescription,
    description,
    category,
    brand,
    material,
    fabric,
    fit,
    careInstructions,
    tags: tags ? JSON.parse(tags) : [],
    colors: parsedColors,
    totalStock,

    isTrending:
      isTrending === "true" || isTrending === true,

    isFeatured:
      isFeatured === "true" || isFeatured === true,

    isNewArrival:
      isNewArrival === "true" || isNewArrival === true,

    isBestSeller:
      isBestSeller === "true" || isBestSeller === true,

    createdBy: loggedInUser._id,
  });

  return {
    success: true,
    message: "Product created successfully.",
    data: product,
  };
};

const getAllProducts = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    isActive: true,
  };

  if (query.category) {
    filter.category = query.category;
  }

  if (query.search) {
    filter.name = {
      $regex: query.search,
      $options: "i",
    };
  }

  const products = await Product.find(filter)
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  return {
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: products,
  };
};


const getProductBySlug = async (slug) => {
  const product = await Product.findOne({
    slug,
    isActive: true,
  })
    .populate("category", "name slug")
    .populate("createdBy", "name email");

  if (!product) {
    throw new Error("Product not found.");
  }

  return {
    success: true,
    data: product,
  };
};


const updateProduct = async (id, productData, files) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found.");
  }

  const {
    name,
    shortDescription,
    description,
    category,
    brand,
    material,
    fabric,
    fit,
    careInstructions,
    tags,
    colors,
    isTrending,
    isFeatured,
    isNewArrival,
    isBestSeller,
  } = productData;

  // Check category
  if (category) {
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      throw new Error("Category not found.");
    }

    product.category = category;
  }

  // Basic fields
  product.name = name;
  product.slug = generateSlug(name);
  product.shortDescription = shortDescription;
  product.description = description;
  product.brand = brand;
  product.material = material;
  product.fabric = fabric;
  product.fit = fit;
  product.careInstructions = careInstructions;

  // Tags
  product.tags = tags ? JSON.parse(tags) : [];

  // Upload new images
  const uploadedImages = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const image = await uploadToCloudinary(
        file.buffer,
        "girly-house/products"
      );

      uploadedImages.push({
        url: image.secure_url,
        publicId: image.public_id,
        altText: name,
      });
    }
  }

  // Parse colors
  let parsedColors = [];

  if (colors) {
    parsedColors = JSON.parse(colors);
  }

  parsedColors = parsedColors.map((color, index) => ({
    ...color,

    images:
      uploadedImages.length > 0
        ? uploadedImages
        : product.colors[index]?.images || [],
  }));

  product.colors = parsedColors;

  // Recalculate stock
  let totalStock = 0;

  parsedColors.forEach((color) => {
    color.sizes.forEach((size) => {
      totalStock += Number(size.stock);
    });
  });

  product.totalStock = totalStock;

  // Status
  product.isTrending =
    isTrending === "true" || isTrending === true;

  product.isFeatured =
    isFeatured === "true" || isFeatured === true;

  product.isNewArrival =
    isNewArrival === "true" || isNewArrival === true;

  product.isBestSeller =
    isBestSeller === "true" || isBestSeller === true;

  await product.save();

  return {
    success: true,
    message: "Product updated successfully.",
    data: product,
  };
};



const deleteProduct = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found.");
  }

  product.isActive = false;

  await product.save();

  return {
    success: true,
    message: "Product deleted successfully.",
  };
};


// Get Trending Products
const getTrendingProducts = async () => {
  const products = await Product.find({
    isTrending: true,
    isActive: true,
  })
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .limit(8);

  return {
    success: true,
    count: products.length,
    data: products,
  };
};

const getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate("category", "name slug")
    .populate("createdBy", "name email");

  if (!product) {
    throw new Error("Product not found.");
  }

  return {
    success: true,
    data: product,
  };
};


const getNewArrivalProducts = async () => {
  const products = await Product.find({
    isNewArrival: true,
    isActive: true,
  })
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .limit(8);

  return {
    success: true,
    count: products.length,
    data: products,
  };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getTrendingProducts,
  getProductById,
  getNewArrivalProducts
};