import api from "./api";

// ==============================
// Get All Products
// ==============================
export const getAllProducts = async (params = {}) => {
  const response = await api.get("/products", {
    params,
  });

  return response.data;
};

// ==============================
// Get Product By ID (Admin)
// ==============================
export const getProductById = async (id) => {
  const response = await api.get(`/products/id/${id}`);

  return response.data;
};

// ==============================
// Get Product By Slug
// ==============================
export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/${slug}`);

  return response.data;
};

// ==============================
// Create Product
// ==============================
export const createProduct = async (formData) => {
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ==============================
// Update Product
// ==============================
export const updateProduct = async (id, formData) => {
  const response = await api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ==============================
// Delete Product
// ==============================
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};

// ==============================
// Trending Products
// ==============================
export const getTrendingProducts = async () => {
  const response = await api.get("/products/trending");

  return response.data;
};



// ==============================
// New Arrival Products
// ==============================

export const getNewArrivalProducts = async () => {
  const response = await api.get("/products/new-arrivals");

  return response.data;
};