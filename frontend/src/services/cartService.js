import API from "./api";

export const getCart = async () => {
  const { data } = await API.get("/cart");
  return data;
};

export const addToCart = async (payload) => {
  const { data } = await API.post("/cart", payload);
  return data;
};

export const updateCartItem = async (itemId, quantity) => {
  const { data } = await API.put(`/cart/${itemId}`, {
    quantity,
  });

  return data;
};

export const removeCartItem = async (itemId) => {
  const { data } = await API.delete(`/cart/${itemId}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await API.delete("/cart");
  return data;
};