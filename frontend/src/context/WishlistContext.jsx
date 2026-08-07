import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getWishlist,
  addWishlist,
  removeWishlist,
} from "../services/wishlistService";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch Wishlist
  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const data = await getWishlist();

      const items = data.items || data.wishlist || [];

      setWishlist(items);
      setWishlistCount(items.length);
    } catch (error) {
      console.error(error);

      setWishlist([]);
      setWishlistCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Add to Wishlist
  const addToWishlist = async (productId) => {
    try {
      const data = await addWishlist(productId);

      toast.success(data.message || "Added to Wishlist");

      await fetchWishlist();

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to add to wishlist"
      );

      throw error;
    }
  };

  // Remove from Wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const data = await removeWishlist(productId);

      toast.success(data.message || "Removed from Wishlist");

      await fetchWishlist();

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to remove from wishlist"
      );

      throw error;
    }
  };

  // Check if Product Exists in Wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => {
      const id = item.product?._id || item.product || item._id;
      return id === productId;
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchWishlist();
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        loading,

        fetchWishlist,
        addToWishlist,
        removeFromWishlist,

        isInWishlist,

        setWishlist,
        setWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);