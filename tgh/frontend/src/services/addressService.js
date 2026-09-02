import api from "./api";

// ==============================
// Get All Addresses
// ==============================
export const getAddresses = async () => {
  const response = await api.get("/address");
  return response.data;
};

// ==============================
// Add Address
// ==============================
export const addAddress = async (addressData) => {
  const response = await api.post("/address", addressData);
  return response.data;
};

// ==============================
// Update Address
// ==============================
export const updateAddress = async (addressId, addressData) => {
  const response = await api.put(`/address/${addressId}`, addressData);
  return response.data;
};

// ==============================
// Delete Address
// ==============================
export const deleteAddress = async (addressId) => {
  const response = await api.delete(`/address/${addressId}`);
  return response.data;
};

// ==============================
// Set Default Address
// ==============================
export const setDefaultAddress = async (addressId) => {
  const response = await api.patch(`/address/default/${addressId}`);
  return response.data;
};

const addressService = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};

export default addressService;