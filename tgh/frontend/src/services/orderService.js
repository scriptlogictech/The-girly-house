import api from "./api";

// ==========================================
// Customer APIs
// ==========================================

// Create Order
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// Get My Orders
export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};

// Get Order By Id
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Cancel Order
export const cancelOrder = async (id) => {
  const response = await api.patch(`/orders/${id}/cancel`);
  return response.data;
};

// ==========================================
// Admin APIs
// ==========================================

// Get All Orders
export const getAllOrders = async () => {
  const response = await api.get("/orders/admin/all");
  return response.data;
};

// Update Order Status
export const updateOrderStatus = async (
  id,
  status
) => {
  const response = await api.patch(
    `/orders/admin/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};