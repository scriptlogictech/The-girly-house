const Category = require("../models/Category");
const generateSlug = require("../utils/generateSlug");

// Create Category
const createCategory = async (categoryData, loggedInUser) => {
  const {
    name,
    description,
    parentCategory,
    displayOrder,
  } = categoryData;

  // Generate Slug
  const slug = generateSlug(name);

  // Check if slug already exists
  const categoryExists = await Category.findOne({ slug });

  if (categoryExists) {
    throw new Error("Category already exists.");
  }

  // If parent category is selected, check whether it exists
  if (parentCategory) {
    const parent = await Category.findById(parentCategory);

    if (!parent) {
      throw new Error("Parent category not found.");
    }
  }

  // Create Category
  const category = await Category.create({
    name,
    slug,
    description,
    parentCategory: parentCategory || null,
    displayOrder,
    createdBy: loggedInUser._id,
  });

  return {
    success: true,
    message: "Category created successfully.",
    data: category,
  };
};



// Get All Categories
const getAllCategories = async () => {
  const categories = await Category.find({ isActive: true })
    .populate("parentCategory", "name slug")
    .sort({ displayOrder: 1 });

  return {
    success: true,
    count: categories.length,
    data: categories,
  };
};


// Get Category By Slug
const getCategoryBySlug = async (slug) => {
  // Find Parent Category
  const category = await Category.findOne({
    slug,
    isActive: true,
  }).populate("createdBy", "name email");

  if (!category) {
    throw new Error("Category not found.");
  }

  // Find Child Categories
  const children = await Category.find({
    parentCategory: category._id,
    isActive: true,
  }).sort({ displayOrder: 1 });

  return {
    success: true,
    data: {
      category,
      children,
    },
  };
};



// Update Category
const updateCategory = async (categoryId, categoryData) => {
  const {
    name,
    description,
    parentCategory,
    displayOrder,
    isActive,
  } = categoryData;

  // Find Category
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new Error("Category not found.");
  }

  // Update Name & Slug
  if (name) {
    category.name = name;
    category.slug = generateSlug(name);
  }

  // Update Description
  if (description !== undefined) {
    category.description = description;
  }

  // Update Parent Category
  if (parentCategory !== undefined) {
    // Prevent self-parenting
    if (parentCategory === categoryId) {
      throw new Error("Category cannot be its own parent.");
    }

    // Validate parent category exists
    if (parentCategory) {
      const parent = await Category.findById(parentCategory);

      if (!parent) {
        throw new Error("Parent category not found.");
      }

      // Prevent 3-level hierarchy
      if (parent.parentCategory) {
        throw new Error(
          "Only two category levels are allowed."
        );
      }
    }

    category.parentCategory = parentCategory || null;
  }

  // Update Display Order
  if (displayOrder !== undefined) {
    category.displayOrder = displayOrder;
  }

  // Update Status
  if (isActive !== undefined) {
    category.isActive = isActive;
  }

  await category.save();

  return {
    success: true,
    message: "Category updated successfully.",
    data: category,
  };
};


// Delete Category
const deleteCategory = async (categoryId) => {
  // Find Category
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new Error("Category not found.");
  }

  // Check if category has child categories
  const childCategory = await Category.findOne({
    parentCategory: categoryId,
  });

  if (childCategory) {
    throw new Error(
      "Cannot delete category because it contains subcategories."
    );
  }

  // Delete Category
  await Category.findByIdAndDelete(categoryId);

  return {
    success: true,
    message: "Category deleted successfully.",
  };
};




module.exports = {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};