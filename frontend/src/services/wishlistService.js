import API from "./api";

export const getWishlist = async () => {
  const { data } = await API.get("/wishlist");

  return data;
};

export const addWishlist = async (productId) => {
  const { data } = await API.post("/wishlist/add", {
    productId,
  });

  return data;
};

export const removeWishlist = async (productId) => {
  const { data } = await API.delete(`/wishlist/remove/${productId}`);

  return data;
};