import api from "./api";

// ==========================================
// CREATE RAZORPAY PAYMENT ORDER
// ==========================================

export const createPaymentOrder = async ({
  addressId,
  couponCode = "",
  buyNowItem = null,
}) => {
  const response = await api.post("/payment/create", {
    addressId,
    couponCode,
    ...(buyNowItem ? { buyNowItem } : {}),
  });

  return response.data;
};

// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

export const verifyPayment = async ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  const response = await api.post("/payment/verify", {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });

  return response.data;
};